const playerMarker = 'X'
const computerMarker = 'O'
let winner = null

function checkWinner(marker) {
	console.warn('checkWinner has not been implemented yet')
}

function getCells() {
	return Array.from(document.querySelectorAll('.cell'))
}

function setWinner(marker) {
	// disable all the cells to prevent further play
	getCells().forEach((cell) => (cell.disabled = true))

	// reveal the winner
	document.getElementById('status').textContent = `${marker}’s wins!`

	// update the winner variable so that handleCellClick knows not to continue
	winner = marker
}

function simulateComputerTurn() {
	// find the empty cells, pick a random one and then place a marker
	const cells = getCells()
	const emptyCells = cells.filter((cell) => cell.textContent === '')
	const randomEmptyCellIndex = Math.ceil(Math.random() * emptyCells.length)
	const randomEmptyCell = emptyCells[randomEmptyCellIndex]
	randomEmptyCell.textContent = computerMarker //causing typeerror
}

function reset() {
	document.getElementById('status').textContent = ''
	getCells().forEach((cell) => {
		cell.textContent = ''
		cell.disabled = false
	})
}

function handleCellClick(e) {
	// what cell did the player click?
	const targetCell = e.target
	// check if the cell has already been filled, do nothing if it has
	const cellMarker = targetCell.textContent
	if (cellMarker === playerMarker) {
		// do nothing, the player needs to click an empty cell - not working
		return
	} else if(cellMarker == computerMarker) {
		// once again do nothing, the player shouldnt be oveerriding the computer's moves
		return
	} else {
		// the cell was not filled: fill the cell with the player's marker and check
		// to see if they have won the game
		targetCell.textContent = playerMarker
		checkWinner(playerMarker)

		if (!winner) {
				// simulate the computer's next turn and check to see if they’ve won
			simulateComputerTurn()
			checkWinner(computerMarker)
			return
		}
		return
		}

}

// add event listeners
getCells().forEach((cell) => cell.addEventListener('click', handleCellClick))
document.getElementById('reset').addEventListener('click', reset)
