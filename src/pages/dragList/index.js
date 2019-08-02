import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import List from './DndList';

import './styles.scss';

const defaultList = [
  { id: 1, title: 'item1' },
  { id: 2, title: 'item2' },
  { id: 3, title: 'item3' },
  { id: 4, title: 'item4' },
  { id: 5, title: 'item5' },
];

function DragLists() {
  const [list, setList] = useState(defaultList);
  const [activeItem, setActiveItem] = useState(list[0]);
  const onDropEnd = (list, fromIndex, toIndex) => {
    setList([...list]);
  };
  const onDelete = list => {
    setList([...list]);
  };
  const onClick = item => {
    if (item.id !== activeItem.id) {
      setActiveItem(item);
    }
  };
  return (
    <div className="list-wrap">
      <DndProvider backend={HTML5Backend}>
        <List
          list={list}
          activeItem={activeItem}
          onDropEnd={onDropEnd}
          onDelete={onDelete}
          onClick={onClick}
        />
      </DndProvider>

    </div>
  );
}

export default DragLists;
