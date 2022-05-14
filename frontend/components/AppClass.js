import React from 'react';
import axios from 'axios';


export default class AppClass extends React.Component {

  state = {
    message: "",
    email: "",
    steps: 0,
    grid: [null, null, null, null, "B", null, null, null, null,]
  }

  getNextGrid = (e) => {
    const t = this.state.grid.indexOf("B")
    const n = [...this.state.grid];
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
    }
    return JSON.stringify(this.state.grid) === JSON.stringify(n) ? null : (n[t] = null, n)
  };

  getXY = () => {
    const e = this.state.grid.indexOf("B");
    let t;
    return e < 3 ? t = 1 : e < 6 ? t = 2 : e < 9 && (t = 3),
      [e % 3 + 1, t]
  }

  getXYMessage = () => {
    const [e, t] = this.getXY();
    return `Coordinates (${e}, ${t})`
  }

  onSubmit = e => {
    e.preventDefault();
    e.target.reset();
    const [t, n] = this.getXY()
    let res;
    axios.post("http://localhost:9000/api/result", {
      email: this.state.email,
      steps: this.state.steps,
      x: t,
      y: n
    }).then((e => {
      res = e.data.message
    }
    )).catch((e => {
      res = e.response.data.message
    }
    )).finally(() => {
      this.setState({
        ...this.state,
        message: res,
      })
    }
    )
  }

  move = e => {
    const t = e.target.id
    const next = this.getNextGrid(t);
    next ? this.setState({
      ...this.state,
      steps: this.state.steps + 1,
      message: "",
      grid: next,
    }) : this.setState({
      ...this.state,
      message: `You can't go ${t}`
    })
  }

  reset = (e) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      message: "",
      email: "",
      steps: 0,
      grid: [null, null, null, null, "B", null, null, null, null,]
    })
    this.myFormRef.reset();
  }

  onChange = e => {
    const { value: t } = e.target;
    this.setState({
      ...this.state,
      email: t
    })
  }


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{this.state.message}</h3>
          <h3 id="steps">You moved {this.state.steps} time{1 == this.state.steps ? "" : "s"}</h3>
        </div>
        <div id="grid">
          {
            this.state.grid.map((value, index) => {
              return (
                <div key={index} className={`square ${this.state.grid[index] ? " square active" : ""}`}>{value}</div>
              )
            })
          }
        </div>
        <div className="info">
          <h3 id="message">{this.state.message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={this.move}>LEFT</button>
          <button id="up" onClick={this.move}>UP</button>
          <button id="right" onClick={this.move}>RIGHT</button>
          <button id="down" onClick={this.move}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form ref={(el) => this.myFormRef = el} onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            onChange={this.onChange}
          ></input>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}
