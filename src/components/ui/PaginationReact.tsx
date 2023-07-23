import { useEffect, useState } from "react";

export function PaginationReact({ total, emitFn }: { total: number; emitFn: Function }) {
    const [current, useCurrent] = useState(1);
    const [first, useFirst] = useState(false);
    const [end, useEnd] = useState(false);

    useEffect(() => {
        useFirst(false);
        useEnd(false);
        if (current <= 1) {
            useFirst(true);
        }
        if (current >= total) {
            useEnd(true);
        }
    }, [current]);

    function nextPage() {
        if (current >= total) return;
        useCurrent((prev) => prev + 1);
        emitFn(current);
    }

    function prevPage() {
        if (current <= 1) return;
        useCurrent((prev) => prev - 1);
        emitFn(current);
    }

    return (
        <div className="flex gap-1 justify-center">
            <div className={`p-2 ${first ? "text-gray-400" : "cursor-pointer"}`} onClick={prevPage}>
                <i className={`fa-solid fa-caret-left text-2xl`}></i>
            </div>
            <div className={`p-2 ${end ? "text-gray-400" : "cursor-pointer"}`} onClick={nextPage}>
                <i className={`fa-solid fa-caret-right text-2xl`}></i>
            </div>
        </div>
    );
}
