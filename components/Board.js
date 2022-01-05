import { useState } from "react";

function Cell({ row, col, state, updateGame }) {
  const piece = state[`${row}-${col}`];
  return (
    <div
      onClick={() => updateGame(row, col)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid transparent",
        width: "40px",
        height: "40px",
      }}
    >
      {piece !== undefined && (
        <div
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "24px",
            backgroundColor: piece === 1 ? "red" : "blue",
          }}
        ></div>
      )}
    </div>
  );
}

export default function Board() {
  const [state, setState] = useState({ "1-1": 1, "7-2": 0, "5-2": 1 });
  const [turn, setTurn] = useState(0);
  const updateGame = (row, col) => {
    const key = `${row}-${col}`;
    if (state[key] !== undefined) {
      return;
    }
    const newTurn = (turn + 1) % 2;
    setState({ ...state, [key]: newTurn });
    setTurn(newTurn);
  };

  const clearGame = () => {
    setState({});
    setTurn(0);
  };

  const borders = [];
  for (let rowIndex = 0; rowIndex < 19; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < 19; colIndex++) {
      row.push(
        <div
          style={{
            border: "1px solid black",
            width: "40px",
            height: "40px",
          }}
        />
      );
    }
    borders.push(<div style={{ display: "flex" }}>{row}</div>);
  }
  const board = [];
  for (let rowIndex = 0; rowIndex < 19; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < 19; colIndex++) {
      row.push(
        <Cell
          state={state}
          updateGame={updateGame}
          row={rowIndex}
          col={colIndex}
        />
      );
    }
    board.push(<div style={{ display: "flex" }}>{row}</div>);
  }
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div
        style={{
          display: "inline",
          width: "100px",
          margin: "10px",
          textAlign: "center",
          cursor: "pointer",
          border: "1px solid black",
          padding: "4px",
        }}
        onClick={() => clearGame()}
      >
        Clear
      </div>
      <div style={{ position: "relative" }}>
        {board}
        <div
          style={{
            zIndex: "-1",
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
        >
          {borders}
        </div>
      </div>
    </div>
  );
}
