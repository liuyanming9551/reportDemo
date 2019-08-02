import React, { useState, useEffect } from 'react'
import Board from './Board';
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { observe } from './Games'
import Style from './index.css';
export default function Demo (){
  const [knightPos, setKnightPos] = useState([1, 7])
  useEffect(() => observe(newPos => setKnightPos(newPos)))
  return (
    <div className={Style.contain}>
      <DndProvider backend={HTML5Backend}>
        <Board knightPosition={knightPos} />
      </DndProvider>

    </div>
  )
}
