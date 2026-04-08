const playerMarker = 'X'
const computerMarker = 'O'
let winner = null

function checkWinner(marker) {
	const cells = getCells()

	//check possible winning patterns
	if(cells[0].textContent == marker && cells[4].textContent==marker && cells[8].textContent==marker)
	{
		setWinner(marker)
	}else if(cells[2].textContent == marker && cells[4].textContent == marker && cells[6].textContent == marker)
	{
		setWinner(marker)
	}else if(cells[1].textContent == marker && cells[4].textContent == marker && cells[7].textContent == marker)
	{
		setWinner(marker)
	}else if(cells[0].textContent == marker && cells[3].textContent == marker && cells[6].textContent == marker)
	{
		setWinner(marker)
	}else if(cells[2].textContent == marker && cells[5].textContent == marker && cells[8].textContent == marker)
	{
		setWinner(marker)
	}else if(cells[0].textContent == marker && cells[1].textContent == marker && cells[2].textContent == marker)
	{
		setWinner(marker)
	}else if(cells[3].textContent == marker && cells[4].textContent == marker && cells[5].textContent == marker)
	{
		setWinner(marker)
	}else if(cells[6].textContent == marker && cells[7].textContent == marker && cells[8].textContent == marker)
	{
		setWinner(marker)
	}

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
	if(emptyCells.length > 0){
		const randomEmptyCellIndex = Math.ceil(Math.random() * emptyCells.length-1)
		const randomEmptyCell = emptyCells[randomEmptyCellIndex]
		randomEmptyCell.textContent = computerMarker
	}else{
	checkWinner()
	}

}

function reset() {
	document.getElementById('status').textContent = ''
	getCells().forEach((cell) => {
		cell.textContent = ''
		cell.disabled = false
	})
	let winner = null;
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
