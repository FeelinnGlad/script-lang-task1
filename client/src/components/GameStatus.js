import './GameStatus.css';
import { Context } from '../App'
import {useContext, useEffect, useState} from "react";
const GameStatus = () => {
    const {gameStatus} = useContext(Context)
    const [gameText, setGameText] = useState('')
    const gameTextLabels = ["Победа!", "Проигрыш", "Ничья"]

    useEffect(() => {
        switch (gameStatus) {
            case "coffee": setGameText(gameTextLabels[0]); break;
            case "tea": setGameText(gameTextLabels[1]); break;
            case "tie": setGameText(gameTextLabels[2]); break;
            default: return
        }
    }, [gameStatus]);
    return (
        <div id='status'>{gameText}</div>
    )
}

export default GameStatus