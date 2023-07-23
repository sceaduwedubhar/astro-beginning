import { GENRE, NovelData, STATE } from "./type";

export function NovelCard({ data }: { data: Omit<NovelData, "allcount"> }) {
    return (
        <div className="flex flex-col border border-green-400 rounded-lg p-2 gap-1 bg-green-200 text-sm">
            <div>{data.title}</div>
            <div>
                Author:{data.writer} / {STATE[data.end]} / Total Chapters:{data.general_all_no}
            </div>
            <div className="text-xs">{data.story}</div>
            <div>Genre: {GENRE[data.genre]}</div>
            <div>Last update: {data.general_lastup}</div>
        </div>
    );
}
