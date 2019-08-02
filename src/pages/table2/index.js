import React from 'react';
import { Table } from 'antd';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import styles from './index.less';

let dragingIndex = -1;

class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow,moveColumn, ...restProps } = this.props;
    const style = { ...restProps.style, cursor: 'move' };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += ' drop-over-downward';
      }
      if (restProps.index < dragingIndex) {
        className += ' drop-over-upward';
      }
    }

    return connectDragSource(
      connectDropTarget(<tr {...restProps} className={className} style={style}/>),
    );
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index,
    };
  },
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
}))(
  DragSource('row', rowSource, connect => ({
    connectDragSource: connect.dragSource(),
  }))(BodyRow),
);



export default class DragSortingTable extends React.Component {
  state = {
    data: [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
      },
    ],
    columns :[
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        onHeaderCell: (column) => {
          console.log(column);
          return {
            onClick: () => {
              console.log(column);
            }
          }
        }
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        onHeaderCell: (column) => {
          console.log(column);
          return {
            onClick: () => {
              console.log(column);
            }
          }
        }
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
        onHeaderCell: (column) => ({
          // moveColumn: this.movecolumn
        })
      },
    ]
  };

  components = {
    body: {
      row: DragableBodyRow,
    },
  };

  moveRow = (dragIndex, hoverIndex) => {
    console.log(dragIndex, hoverIndex);
    const { data } = this.state;
    const dragRow = data[dragIndex];
  console.log(dragRow)
    this.setState(
      update(this.state, {
        data: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragRow]],
        },
      }),
    );
  };
  test = () =>{
    console.log("ssss")
  }
  movecolumn = (currCous) => {

    const { columns } = this.state;
    //const dragRow = data[dragIndex];

    this.setState(
      update(this.state, {
        columns: {
          $splice: [[0, 1], [1, 0, currCous]],
        },
      }),
    );
  };
  render() {
    return (
      <DndProvider backend={HTML5Backend}>
        <Table
          bordered
          className={styles.myTable}
          columns={this.state.columns}
          dataSource={this.state.data}
          components={this.components}
          onRow={(record, index) => ({
            index,
            moveRow: this.moveRow,
          })}

        />
      </DndProvider>
    );
  }
}
