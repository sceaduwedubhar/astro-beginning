import { useEffect, useRef, useState } from "react";
import { PaginationReact } from "../ui/PaginationReact";
import { NovelShelf } from "./NovelShelf";
import { NovelTable } from "./NovelTable";
import { SearchBarReact } from "./SearchBarReact";
import type { NovelData } from "./type";

export function NovelList() {
    const [total, useTotal] = useState(0);
    const [result, useResult] = useState<NovelData[]>([]);
    const [searchText, useSearchText] = useState("");
    const [page, usePage] = useState(1);
    const [novelList, useNovelList] = useState<NovelData[]>([]);
    const first = useRef(true);

    useEffect(() => {
        const novel = localStorage.getItem("novel");
        if (!novel) {
            return;
        }
        const novelJSON = JSON.parse(novel);
        const ncodeStr = Array.isArray(novelJSON) ? novelJSON.map((v) => v.ncode).join("-") : "";

        if (!ncodeStr) {
            return;
        }
        const controller = new AbortController();
        const signal = controller.signal;

        fetch(`/novelapi?of=n-t-w-gl-ga-e&out=json&ncode=${ncodeStr}`, {
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

    useEffect(() => {
        if (first.current) {
            first.current = false;
            return;
        }
        console.log(novelList);
        const list = novelList.map((v) => ({ ncode: v.ncode, last_update: v.general_lastup }));
        localStorage.setItem("novel", JSON.stringify(list));
    }, [novelList]);

    function addNovel(novel: NovelData) {
        const found = novelList.find((ele) => ele.ncode === novel.ncode);
        if (found) {
            return;
        }
        useNovelList((prev) => [...prev, novel]);
    }

    function removeNovel(ncode: string) {
        useNovelList((prev) => prev.filter((v) => v.ncode !== ncode));
    }

    return (
        <div className="flex flex-col gap-2">
            <SearchBarReact emitFn={(text: string) => useSearchText(text)}></SearchBarReact>
            <NovelShelf data={novelList} removeFn={removeNovel} />
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
