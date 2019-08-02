import { ItemTypes } from './Constants'
import { useDrag, DragPreviewImage } from 'react-dnd'
import { knightImage } from './knightImage';
function Knight() {
  const [{isDragging}, drag, preview] = useDrag({
    item: { type: ItemTypes.KNIGHT },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })
  return (
    <>
      <DragPreviewImage connect={preview} src={knightImage}></DragPreviewImage>
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          fontSize: 80,
          fontWeight: 'bold',
          cursor: 'move',
        }}
      >
        ♘
      </div>
    </>
  )
}
export default Knight
