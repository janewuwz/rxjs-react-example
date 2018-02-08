import React from 'react'
import { compose, withHandlers, withState, pure, shouldUpdate} from 'recompose'

const optimize = compose(
  pure,
  // #2
  // onlyUpdateForKeys(['data', 'width', 'onChange']),

  // #3
  // onlyUpdateForPropTypes,
  // setPropTypes({
  //   data: PropTypes.string,
  //   width: PropTypes.number,
  //   onChange: PropTypes.func,
  // })

  // #4
  // shouldUpdate((prev, next) =>
  //   prev.data !== next.data ||
  //   prev.width !== next.width ||
  //   prev.onChange !== next.onChange
  // ),
  withHandlers({
    onChange: ({id, onChange}) => e => onChange(id, e.target.value)
  })
)

const Cell = optimize(({data, onChange, width}) =>
  <div style={{width: `${width}%`, borderColor: randomColor()}}>
    <textarea type='text' value={data} onChange={onChange} />
  </div>
)

const Spreadsheet = ({ rows, cols, cellsData, onCellChange }) =>
  <div className='Spreadsheet'>
    { range(rows)
        .map((row, i) =>
          range(cols)
            .map((col, j) => `${i}-${j}`)
            .map(id =>
              <Cell
                key={id}
                id={id}
                data={cellsData[id] || ''}
                onChange={
                  onCellChange
                }
                width={100 / cols}
              />)) }
  </div>

const enhance = compose(
  withState('cellsData', 'setCells', {}),
  withHandlers({
    setCellState: ({cellsData, setCells}) => (id, val) =>
      setCells({
        ...cellsData,
        [id]: val
      })
  })
)

const App = enhance(({cellsData, setCellState}) =>
  <div>
    <Spreadsheet
      {...{rows: 3, cols: 3, cellsData, onCellChange: setCellState}} />
  </div>)

function range (num) {
  return Array.from(Array(num).keys())
}

function randomColor () {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

export default App
