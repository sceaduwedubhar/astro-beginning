import { useEffect, useState } from "react";
import { SearchBarReact } from "./SearchBarReact";
import { PaginationReact } from "../ui/PaginationReact";
import { NovelCard } from "./NovelCard";
import type { NovelData } from "./type";

export function NovelList() {
    const [total, useTotal] = useState(0);
    const [result, useResult] = useState<NovelData[]>([]);
    const [searchText, useSearchText] = useState("");
    const [page, usePage] = useState(1);

    useEffect(() => {
        console.log(searchText, page);
        if (searchText.length === 0) return;
        const controller = new AbortController();
        const signal = controller.signal;
        fetch(`/novelapi?of=n-t-u-w-s-g-gl-e-ga&out=json&word=${searchText}&lim=5&st=${5 * (page - 1) + 1}`, {
            signal: signal,
        })
            .then((res) => res.json())
            .then((res) => {
                const first = res.shift();
                useTotal(first["allcount"]);
                useResult(res);
            })
            .catch((e) => console.log(e));

        return () => controller.abort();
    }, [searchText, page]);

    return (
        <div>
            <SearchBarReact emitFn={(text: string) => useSearchText(text)}></SearchBarReact>
            <PaginationReact
                total={Math.ceil(total / 5 + 1)}
                emitFn={(page: number) => usePage(page)}
            ></PaginationReact>
            {result.map((data) => (
                <NovelCard data={data} />
            ))}
        </div>
    );
}
