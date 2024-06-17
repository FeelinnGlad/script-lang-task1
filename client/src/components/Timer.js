import './Timer.css';
import {useContext, useEffect, useRef, useState} from "react";
import {Context} from "../App";

const Timer = () => {
    const [time, setTime] = useState(0);
    const {gameStatus} = useContext(Context)

    const timer = useRef(null);

    useEffect(() => {
        if (!gameStatus) {
            startTimer();
        } else stopTimer()

        return () => clearInterval(timer.current);
    }, [gameStatus]);

    const startTimer = () => {
        timer.current = setInterval(() => {
            setTime((oldTime) => oldTime + 1)
        }, 1000);
    };

    const stopTimer = () => {
        clearInterval(timer.current);
    };

    return (
        <>
            <div id="timer">{time || "--:--"} сек.</div>
        </>
    );
}

export default Timer