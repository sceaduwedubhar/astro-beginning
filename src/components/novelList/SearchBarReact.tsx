import { useState } from "react";

export function SearchBarReact() {
    const [search, useSearch] = useState("");

    function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
        useSearch(e.target.value);
    }

    async function onEnterPressHandler(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == "enter") {
            await onSubmit();
        }
    }

    async function onSubmit() {
        const res = await fetch(`https://api.syosetu.com/novelapi/api/?out=json&title=${search}`);
        console.log(res);
    }

    return (
        <div className="flex gap-1">
            <input
                className="grow border p-1 rounded-lg"
                type="search"
                onChange={onChangeHandler}
                onKeyDown={onEnterPressHandler}
            />
            <button className="border bg-gray-200 p-1 rounded-lg" onClick={onSubmit}>
                Search
            </button>
        </div>
    );
}
