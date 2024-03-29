import { STATE, type NovelData } from "./type";

export function NovelShelf({ data, removeFn }: { data: NovelData[]; removeFn: Function }) {
    return (
        <div className="grid grid-cols-3 gap-1">
            {data.map((v: NovelData) => (
                <div className="grid border rounded-lg p-2 gap-1 bg-gray-300">
                    <div>
                        <a href={`https://ncode.syosetu.com/${v.ncode.toLowerCase()}/`} target="_blank">
                            Title: {v.title}
                        </a>
                    </div>
                    <div>Author: {v.writer}</div>
                    <div className="flex justify-between">
                        <div>{STATE[v.end]}</div>
                        <div>Total Chapters:{v.general_all_no}</div>
                    </div>
                    <div>Last update: {v.general_lastup}</div>
                    <button className="hover:bg-gray-400 rounded-lg" onClick={() => removeFn(v.ncode)}>
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}
