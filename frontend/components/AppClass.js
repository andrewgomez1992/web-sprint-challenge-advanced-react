import React from 'react'



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

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({
      ...this.state,
      email: ""
    })
    console.log("wtf")
  }

  reset = (e) => {
    this.setState({
      ...this.state,
      message: "",
      email: "",
      steps: 0,
      grid: [null, null, null, null, "B", null, null, null, null,]
    })
    console.log('RESET NOT FCKIN WORKING FOR EMAIL')
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">error</h3>
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
          <button id="reset" onClick={this.state}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
          ></input>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}
