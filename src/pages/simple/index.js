import Example from './exampleTest'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

function Simple() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <Example />
      </DndProvider>
    </div>
  )
}
export default Simple;
