import { useEffect, useState } from "react";

export function PaginationReact({ total, emitFn }: { total: number; emitFn: Function }) {
    const [current, useCurrent] = useState(1);

    useEffect(() => {
        useCurrent(1);
    }, [total]);

    useEffect(() => {
        emitFn(current);
    }, [current]);

    function nextPage() {
        if (current >= total) return;
        useCurrent((prev) => prev + 1);
    }

    function prevPage() {
        if (current <= 1) return;
        useCurrent((prev) => prev - 1);
    }

    return (
        <div className="flex gap-1 justify-center">
            <div className={`p-2 ${current <= 1 ? "text-gray-400" : "cursor-pointer"}`} onClick={prevPage}>
                <i className={`fa-solid fa-caret-left text-2xl`}></i>
            </div>
            <div className={`p-2 ${current >= total ? "text-gray-400" : "cursor-pointer"}`} onClick={nextPage}>
                <i className={`fa-solid fa-caret-right text-2xl`}></i>
            </div>
        </div>
    );
}
