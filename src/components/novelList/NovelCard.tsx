import { GENRE, NovelData, STATE } from "./type";

export function NovelCard({ data, style, buttonFn }: { data: NovelData; style?: string; buttonFn: Function }) {
    return (
        <div className={`flex  flex-col ${style}`}>
            <div>{data.title}</div>
            <div>
                Author:{data.writer} / {STATE[data.end]} / Total Chapters:{data.general_all_no}
            </div>
            <div className="text-xs max-w-full">{data.story}</div>
            <div>Genre: {GENRE[data.genre]}</div>
            <div>Last update: {data.general_lastup}</div>
            <button onClick={() => buttonFn()}>add</button>
        </div>
    );
}
