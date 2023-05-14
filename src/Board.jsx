import { useState } from 'react'

export default function Board ({ moves, makeMove, changeTurn, disable, winningCombination }) {
  return (
    <div className='board'>
      {moves.map((move, index) => {
        return (
          <Button
            key={index + move}
            move={move}
            changeTurn={changeTurn}
            onClick={() => makeMove(index)}
            disable={disable}
            winner={winningCombination?.includes(index)}
          />
        )
      })}
    </div>
  )
}

function Button ({ move, onClick, disable, winner }) {
  return <button className={winner ? 'winner' : undefined} disabled={move || disable} onClick={onClick}>{move}</button>
}
