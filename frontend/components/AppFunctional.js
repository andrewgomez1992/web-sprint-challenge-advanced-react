import React, { useState, useRef } from 'react';
import axios from 'axios';

export default function AppFunctional(props) {

  const initialGrid = [null, null, null, null, "B", null, null, null, null]

  const ref = useRef()
  const [grid, setGrid] = useState(initialGrid)
  const [steps, setSteps] = useState(0)
  const [message, setMessage] = useState("")
  const [email, setEmail] = useState("")

  const onSubmit = (e) => {
    e.preventDefault();
    const [x, y] = getXY();
    let res;
    axios.post('http://localhost:9000/api/result', {
      email: email,
      steps: steps,
      x: x,
      y: y
    })
      .then((e => {
        res = e.data.message
      }
      )).catch((e => {
        res = e.response.data.message
      }
      )).finally((() => {
        setMessage(res)
      }
      ))
  }

  const getXYMessage = () => {
    const [e, t] = getXY();
    return `Coordinates (${e}, ${t})`
  }

  const getXY = () => {
    const e = grid.indexOf("B");
    let t;
    return e < 3 ? t = 1 : e < 6 ? t = 2 : e < 9 && (t = 3),
      [e % 3 + 1, t]
  }

  const onChange = (e) => {
    const { value: t } = e.target;
    setEmail(t)
  }

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

  const reset = () => {
    setMessage("")
    setGrid(initialGrid)
    setSteps(0)
    ref.current.value = "";
  }

  const resetSome = () => {
    setMessage("")
    ref.current.value = "";
  }

  const { className } = props;
  return (
    <div id="wrapper" className={className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage()}</h3>
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
        <h3 id="message" data-testid="error">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={getNextGrid}>LEFT</button>
        <button id="up" onClick={getNextGrid}>UP</button>
        <button id="right" onClick={getNextGrid}>RIGHT</button>
        <button id="down" onClick={getNextGrid}>DOWN</button>
        <button id="reset" data-testid="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit} onSubmitCapture={resetSome}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          onChange={onChange}
          ref={ref}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div >
  )
}
