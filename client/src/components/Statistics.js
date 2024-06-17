import './Statistics.css';
import {Context} from "../App";
import {useContext, useEffect, useRef, useState} from "react";

const Statistics = () => {

    const {backendData, gameStatus} = useContext(Context)
    const [isLastPlayerMe, setIsLastPlayerMe] = useState(true)
    const [statistics, setStatistics] = useState([])
    const hasPageBeenRendered = useRef(false);

    useEffect(() => {
        if (hasPageBeenRendered.current) {
            if (!isLastPlayerMe) {
                setStatistics(statistics => [...statistics, {
                    player: isLastPlayerMe ? "me" : "dummy",
                    move: backendData.latestMove,
                    time: isLastPlayerMe ? "--" : backendData.respTime - backendData.reqTime
                }])
            }
            setIsLastPlayerMe((prevState) => !prevState)
        }
        hasPageBeenRendered.current = true
    }, [backendData, gameStatus]);
    return (
        <div id='statistics'>
            <table>
                <thead>
                <tr key={statistics.move}>
                    <td>Игрок</td>
                    <td>Ход</td>
                    <td>Время ответа сервера, мс</td>
                </tr>
                </thead>
                <tbody>
                {statistics.map((el) => <tr>
                    <td>{el.player}</td>
                    <td>{el.move}</td>
                    <td>{el.time}</td>
                </tr>) || 'empty'}
                </tbody>
            </table>
        </div>
    )
}

export default Statistics