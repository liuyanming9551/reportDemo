import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import styles from './styles.less';
import custom from './custom.less';

export default class GridExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: '姓名',
          colId: 'test',
          pinned: 'left',
          lockPinned: true,
          groupHeaderHeight: 0,
        },
        {
          headerName: 'Athlete Details',
          children: [
            {
              headerName: 'Athlete',
              field: 'athlete',
              width: 90,
              type: 'nonEditableColumn',
            },
            {
              headerName: 'Age',
              field: 'age',
              width: 90,
            },
            {
              headerName: 'Country',
              field: 'country',
              width: 120,
            },
          ],
        },
        {
          headerName: 'Medal details',
          children: [
            {
              headerName: 'Year',
              field: 'year',
              width: 90,
            },
            {
              headerName: 'Date',
              field: 'date',
              width: 110,
            },
            {
              headerName: 'Sport',
              field: 'sport',
              width: 110,
            },
            {
              headerName: 'Gold',
              field: 'gold',
              width: 100,
            },
            {
              headerName: 'Silver',
              field: 'silver',
              width: 100,
            },
            {
              headerName: 'Bronze',
              field: 'bronze',
              width: 100,
            },
            {
              headerName: 'Total',
              field: 'total',
              width: 100,
            },
          ],
        },

      ],
      // frameworkComponents: { customHeaderGroupComponent: CustomHeaderGroup },
      rowData: null,
      defaultColDef: {
        width: 90,
        resizable: true,
        editable: true,

      },
      isDrag: null,
      headerHeight: 50,
      groupHeaderHeight: 50,
      isShow:true,
      columnTypes: {
        nonEditableColumn: { editable: false },
      },
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    const httpRequest = new XMLHttpRequest();
    const updateData = data => {
      this.setState({ rowData: data });
    };

    httpRequest.open(
      'GET',
      'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json',
    );
    httpRequest.send();
    httpRequest.onreadystatechange = () => {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        updateData([]);
      }
    };
  };
  cellClick = (e) => {
    console.log('我触发点击了', e);
  };
  leftScroll = () => {
    console.log('点击left');


  };
  rightScroll = () => {
    console.log('点击right');
    //console.log(this.gridApi.getHorizontalPixelRange)
    console.log(this.gridApi.setAlwaysShowVerticalScroll());

  };
  columnMoved = (e) => {
    console.log(e);
    const { allDisplayedColumns } = e.columnApi.columnController;
    const [ columnObj ] = e.columns;
    // console.log(columnObj)
    // console.log("isMoving",columnObj.moving)
    // console.log(columnObj.headerName='')
    console.log(allDisplayedColumns)
    console.log(allDisplayedColumns[allDisplayedColumns.length-1])
    // allDisplayedColumns.map(function(item,index) {
    //   console.log(item,index)
    //   if(item.moving){
    //     console.log(item[index-1])
    //   }
    // })

    //this.gridColumnApi.moveColumns(["测试"], 0);

  };
  dragStopped = (e) => {
    //console.log(e)

    //console.log(allDisplayedColumns)
    //console.log("this.api",e)
  };

  addColumn = () => {
    console.log('添加列');
    // {
    //   headerName: 'test'
    // },
    var obj = {
      headerName: '测试',
      field: '测试',
      originName: '测试',
    };
    const { columnDefs } = this.state;
    columnDefs.push(obj);
    console.log(columnDefs);
    this.gridApi.setColumnDefs(columnDefs);

    // var cols = this.gridColumnApi.getRowGroupColumns();
    // console.log(cols)
  };

  render() {
    return (
      <div style={{ height: '100%', position: 'relative' }} className={styles.noDataInfo}>

        <div className={custom.customTable}>
          <div className="index__customTable">
            <div className='index__tableBar'>
              <div
                id="myGrid"
                style={{
                  height: '500px',
                  paddingLeft: '100px',
                  paddingRight: '200px',
                }}
                className="ag-theme-balham"
              >
                <AgGridReact
                  ref='agGrid'
                  columnDefs={this.state.columnDefs}
                  // frameworkComponents={this.state.frameworkComponents}
                  columnTypes={this.state.columnTypes}
                  rowDragManaged={true}
                  domLayout='autoHeight'
                  rowData={this.state.rowData}
                  defaultColDef={this.state.defaultColDef}
                  onGridReady={this.onGridReady}
                  headerHeight={40}
                  groupHeaderHeight={40}
                  onColumnMoved={this.columnMoved}
                  onCellClicked={this.cellClick}
                  onDragStopped={this.dragStopped}
                />
              </div>
            </div>
          </div>
          <div className="index__fieldInfo">

          </div>
        </div>

        {/*<div className={styles.btnLeft} onClick={this.leftScroll}>left</div>*/}
        <div className={styles.addColumn} onClick={this.addColumn}>+</div>
        {/*<div className={styles.btnRight} onClick={this.rightScroll}>right</div>*/}
      </div>
    );
  }
}
