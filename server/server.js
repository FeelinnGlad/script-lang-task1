const express = require('express')
const app = express()

const PORT = 5000;

app.use(express.json({
    type: ['application/json', 'text/plain']
}))

function gameManager(gameGrid) {
    const checkCombination = (arr) => arr.every( (val, i, arr) => (val === arr[0]) && typeof val === 'string' )
    if (checkCombination([gameGrid[0], gameGrid[1], gameGrid[2]])) return gameGrid[0];
    if (checkCombination([gameGrid[3], gameGrid[4], gameGrid[5]])) return gameGrid[3];
    if (checkCombination([gameGrid[6], gameGrid[7], gameGrid[8]])) return gameGrid[6];
    if (checkCombination([gameGrid[0], gameGrid[3], gameGrid[6]])) return gameGrid[0];
    if (checkCombination([gameGrid[1], gameGrid[4], gameGrid[7]])) return gameGrid[1];
    if (checkCombination([gameGrid[2], gameGrid[5], gameGrid[8]])) return gameGrid[2];
    if (checkCombination([gameGrid[0], gameGrid[4], gameGrid[8]])) return gameGrid[0];
    if (checkCombination([gameGrid[2], gameGrid[4], gameGrid[6]])) return gameGrid[2];

    if (gameGrid.reduce((out, bool, index) => bool ? out.concat(index) : out, []).length === 9) return "tie";
    else return '';
}

app.post('/game', function(req, res) {
    // Formulating response
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");

    var responseData = req.body
    responseData.respTime = Date.now()

    let winner = gameManager(responseData.grid)
    if (winner === '') {
        const emptyCellsIDs = responseData.grid.reduce((out, bool, index) => !bool ? out.concat(index) : out, [])
        const randomCellID = emptyCellsIDs[Math.floor(Math.random() * emptyCellsIDs.length)];
        responseData.latestMove = randomCellID + 1;
        responseData.grid[randomCellID] = "tea"
        responseData.gameResult = gameManager(responseData.grid)
        res.json(responseData)
    } else {
        responseData.gameResult = winner
        res.json(responseData)
    }
    console.log(`POST request occurred by path /game with the following body: ${responseData}`)
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
})