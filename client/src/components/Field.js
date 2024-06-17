import './Field.css'
import React, {useContext, useEffect, useRef, useState} from "react";
import Cell from "./Cell";
import { Context } from '../App'

const Field = () => {
    const { grid, setGrid, gameStatus, setGameStatus } = useContext(Context);
    const {backendData, setBackendData} = useContext(Context)
    const [shouldSendRequest, setShouldSendRequest] = useState(false);
    const hasPageBeenRendered = useRef(false);

    const sendRequest = () => {
        const currentTime = Date.now();
        const infoObj = { ...backendData, reqTime: currentTime, grid };
        setBackendData(infoObj);

        fetch('http://localhost:5000/game', {
            method: 'post',
            body: JSON.stringify(infoObj),
        })
            .then(res => res.json())
            .then(data => {
                setBackendData(data);
                setGrid(data.grid);
                setShouldSendRequest(false); // Сбрасываем флаг после успешного запроса
            });
    };

    const cellClickHandler = (event) => {
        let newGrid = [...grid];
        newGrid[event.target.id.substring(1) - 1] = "coffee";
        setGrid(newGrid);
        setShouldSendRequest(true); // Устанавливаем флаг для отправки запроса
    };

    useEffect(() => {
        if (hasPageBeenRendered.current) {
            if (shouldSendRequest) {
                sendRequest();
            }
            if (backendData.gameResult) setGameStatus(backendData.gameResult);
        }
        hasPageBeenRendered.current = true

    }, [shouldSendRequest, grid, gameStatus]);

return (
        <div id="grid" className={`${gameStatus ? 'disabled' : ''}`}>
            {
                grid.map((item, index) => (
                    <Cell className={`cell ${!grid[index] || 'occupied'}`} id={`c${index + 1}`} value={item} key={index} onclick={cellClickHandler} />
                ))
            }
        </div>
    )
}

export default Field