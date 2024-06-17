import React, {useState} from 'react';
import './App.css';
import Field from "./components/Field";
import Button from "./components/Button";
import GameStatus from "./components/GameStatus";
import Timer from "./components/Timer";
import Statistics from "./components/Statistics";

const Context = React.createContext();
const App = () => {
    console.log(">>>>>> APP")
    const [gameStatus, setGameStatus] = useState('')
    const [shouldStatsBeUpdated, setShouldStatsBeUpdated] = useState(false)
    const [grid, setGrid] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])


    const [backendData, setBackendData] = useState({
        reqTime: undefined,
        respTime: undefined,
        grid,
        latestMove: '',
        gameResult: ''
    });

    return (
        <Context.Provider value={{gameStatus, setGameStatus, grid, setGrid, backendData, setBackendData, setShouldStatsBeUpdated, shouldStatsBeUpdated}}>
            <div id="root-wrapper">
                <h2 className="header">Tic-tac-toe with a dummy</h2>
                <div id="wrapper">
                    <Field/>
                    <Button />
                    <GameStatus/>
                    <Timer/>
                    <div id="stats-table"><Statistics/></div>
                </div>
                <div id="footer">Scripting languages: lab. #1, by Kate Mironenko.</div>
            </div>
        </Context.Provider>

    );
}

export {App, Context};