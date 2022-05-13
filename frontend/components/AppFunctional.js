import React, { useState } from 'react';
import axios from 'axios';


const initialState = {
  message: "",
  email: "",
  steps: 0,
  grid: [null, null, null, null, "B", null, null, null, null,]
}

export default function AppFunctional(props) {

  const [state, setState] = useState({
    message: "",
    email: "",
    steps: 0,
    grid: [null, null, null, null, "B", null, null, null, null,]
  })

  const [grid, setGrid] = useState(state.grid)
  const [steps, setSteps] = useState(0)
  const [message, setMessage] = useState("")


  const getNextGrid = (e) => {
    const t = e.target.id
      , n = function (e) {
        const t = grid.indexOf("B")
          , n = [...grid];
        switch (e) {
          case "up":
            if (t < 3)
              break;
            n[t - 3] = "B";
            break;
          case "down":
            if (t > 5)
              break;
            n[t + 3] = "B";
            break;
          case "left":
            if (t % 3 == 0)
              break;
            n[t - 1] = "B";
            break;
          case "right":
            if ((t - 2) % 3 == 0)
              break;
            n[t + 1] = "B"
        };
        return JSON.stringify(grid) === JSON.stringify(n) ? null : (n[t] = null, n)
      }(t);
    n ? (setSteps(steps + 1),
      setMessage(""),
      setGrid(n)) : setMessage(`You can't go ${t}`)
  };

  const { className } = props;
  return (
    <div id="wrapper" className={className}>
      <div className="info">
        <h3 id="coordinates">error</h3>
        <h3 id="steps">You moved {steps} time{1 == steps ? "" : "s"}</h3>
      </div>
      <div id="grid">
        {
          grid.map((value, index) => {
            return (
              <div key={index} className={`square ${grid[index] ? " square active" : ""}`}>{value}</div>
            )
          })
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={getNextGrid}>LEFT</button>
        <button id="up" onClick={getNextGrid}>UP</button>
        <button id="right" onClick={getNextGrid}>RIGHT</button>
        <button id="down" onClick={getNextGrid}>DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input
          id="email"
          type="email"
          placeholder="type email"
        // onChange={onChange}
        ></input>
        <input type="submit"></input>
      </form>
    </div>
  )
}
