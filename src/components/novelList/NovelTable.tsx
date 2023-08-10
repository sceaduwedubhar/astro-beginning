import { NovelCard } from "./NovelCard";
import type { NovelData } from "./type";

export function NovelTable({
    pagination,
    data,
    addFn,
}: {
    pagination: JSX.Element;
    data: NovelData[];
    addFn: Function;
}) {
    return (
        <div className="flex flex-col gap-1 p-2">
            {pagination}
            {data.map((v) => (
                <div className="grid">
                    <NovelCard
                        style=" border border-green-400 rounded-lg p-2 gap-1 bg-green-200 text-sm"
                        data={v}
                        buttonFn={() => addFn(v)}
                    />
                </div>
            ))}
        </div>
    );
}
