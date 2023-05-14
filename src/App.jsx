import { useState } from 'react'
import Board from './Board'

function App () {
  const [turn, setTurn] = useState('X')
  const [moves, setMoves] = useState(new Array(9).fill(null))
  const [winner, setWinner] = useState(null)
  let instructions = `${turn} to play.`

  // Make move and change turn
  function makeMove (index) {
    const newMoves = [...moves]
    newMoves[index] = turn
    setMoves(newMoves)
    setTurn(turn === 'X' ? 'O' : 'X')
  }

  // Resets the game state
  function resetBoard () {
    setTurn('X')
    setMoves(new Array(9).fill(null))
    setWinner(null)
  }

  // Check winner before rendering
  // If there is a winner update state and re-render
  const isWon = checkWinner(moves)
  if (isWon && !winner) {
    setWinner(isWon)
  }
  if (winner) instructions = `${winner.winner} won.`

  // Check for tie on each render
  // If tied, update the message
  const isTied = moves.every(move => move !== null) && !winner
  if (isTied) instructions = 'Game Tied'

  return (
    <>
      <p>{instructions}</p>
      <Board makeMove={makeMove} moves={moves} disable={winner || isTied} winningCombination={winner?.winningCombination} />
      <button onClick={resetBoard}>Reset Game</button>
    </>
  )
}

export default App

const winningCombinations = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal from top left
  [2, 4, 6] // diagonal from top right
]

function checkWinner (moves) {
  for (const winningCombo of winningCombinations) {
    const move1 = moves[winningCombo[0]]
    const move2 = moves[winningCombo[1]]
    const move3 = moves[winningCombo[2]]

    if (!move1) continue

    if (move1 === move2 && move1 === move3) {
      return { winner: move1, winningCombination: winningCombo }
    }
  }
  return null
}
