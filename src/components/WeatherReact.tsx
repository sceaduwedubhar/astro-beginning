import { useState } from "react";

export function WeatherReact() {
    const [count, setCount] = useState(0);

    return <div className="border-2 border-black rounded p-2">Weather</div>;
}
