import { useEffect, useState } from "react";
import { SearchBarReact } from "./SearchBarReact";
import { PaginationReact } from "../ui/PaginationReact";
import { NovelCard } from "./NovelCard";
import type { NovelData } from "./type";
import { NovelTable } from "./NovelTable";
import { NovelShelf } from "./NovelShelf";

export function NovelList() {
    const [total, useTotal] = useState(0);
    const [result, useResult] = useState<NovelData[]>([]);
    const [searchText, useSearchText] = useState("");
    const [page, usePage] = useState(1);
    const [novelList, useNovelList] = useState<NovelData[]>([]);

    useEffect(() => {
        const novel = localStorage.getItem("novel");
        if (!novel) {
            return;
        }
        const novelJSON = JSON.parse(novel);
        const ncodeStr = Array.isArray(novelJSON) ? novelJSON.reduce((acc, curr) => `${curr["ncode"]}-${acc}`, "") : "";
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(`/novelapi?of=t-w-gl-ga-e&out=json&ncode=${ncodeStr}`, {
            signal: signal,
        })
            .then((res) => res.json())
            .then((res: NovelData[]) => {
                res.shift();
                useNovelList(res);
            })
            .catch((e) => console.log(e));

        return () => controller.abort();
    }, []);

    useEffect(() => {
        console.log(searchText, page);
        if (searchText.length === 0) return;
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(`/novelapi?of=n-t-u-w-s-g-gl-e-ga&out=json&word=${searchText}&lim=5&st=${5 * (page - 1) + 1}`, {
            signal: signal,
        })
            .then((res) => res.json())
            .then((res: NovelData[]) => {
                const first = res.shift();
                useTotal(first!["allcount"]);
                useResult(res);
            })
            .catch((e) => console.log(e));

        return () => controller.abort();
    }, [searchText, page]);

    function addNovel(novel: NovelData) {
        const found = novelList.find((ele) => ele.ncode === novel.ncode);
        if (found) {
            return;
        }
        useNovelList((prev) => [...prev, novel]);
    }

    function removeNovel() {}

    return (
        <div className="flex flex-col gap-2">
            <SearchBarReact emitFn={(text: string) => useSearchText(text)}></SearchBarReact>
            <NovelShelf data={novelList} />
            <NovelTable
                pagination={
                    <PaginationReact
                        total={Math.ceil(total / 5 + 1)}
                        emitFn={(page: number) => usePage(page)}
                    ></PaginationReact>
                }
                data={result}
                addFn={addNovel}
            />
        </div>
    );
}
