import { STATE, type NovelData } from "./type";

export function NovelShelf({ data }: { data: NovelData[] }) {
    return (
        <div className="grid grid-cols-3 gap-1">
            {data.map((v: NovelData) => (
                <div className="grid border rounded-lg p-2 gap-1 bg-gray-300">
                    <div>Title: {v.title}</div>
                    <div>Author: {v.writer}</div>
                    <div className="flex justify-between">
                        <div>{STATE[v.end]}</div>
                        <div>Total Chapters:{v.general_all_no}</div>
                    </div>
                    <div>Last update: {v.general_lastup}</div>
                </div>
            ))}
        </div>
    );
}
