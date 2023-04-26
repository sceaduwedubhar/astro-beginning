import { useEffect, useState } from "preact/hooks";

export function WeatherPreact() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=43.70&longitude=-79.42&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto"
        )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
    });

    return <div class="border-2 border-black rounded p-2">Weather</div>;
}
