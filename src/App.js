import React, { Component } from 'react';
import Timer from './components/timer'
import Control from './components/control'

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionTime: 1,
      breakTime: 1,
      active: 'session',
      timeLeft: 0,
      running: false,
      seconds: 0
    }
    this.timer
  }

  increment(name) {
    const { [name]: time } = this.state;
    if (time === 60) return;
    this.setState({
      [name]: time + 1
    })

  }

  decrement(name) {
    const { [name]: time } = this.state;
    if (time === 1) return;
    this.setState({
      [name]: time - 1
    })
  }

  start() {

    if (this.state.running) {
      clearInterval(this.timer)
      this.setState({ running: false })
      return;
    }
    this.timer = setInterval(() => {
      let {
        sessionTime,
        breakTime,
        active,
        timeLeft,
        running,
        seconds
      } = this.state

      if (!timeLeft && !seconds)
        timeLeft = active === 'session' ? sessionTime : breakTime

      if (seconds === 0) {
        seconds = 60
        timeLeft--
      }

      seconds--

      if (seconds === 0 && timeLeft === 0)
        this.setState({
          active: active === 'session' ? 'break' : 'session',
          timeLeft: active === 'session' ? breakTime : sessionTime,
          running: true,
          seconds: 0
        })
      else
        this.setState({
          timeLeft: timeLeft,
          running: true,
          seconds: seconds
        })
    }, 1000)
  }

  reset() {
    this.setState({
      sessionTime: 25,
      breakTime: 5,
      active: 'session',
      timeLeft: 0,
      running: false,
      seconds: 0
    })
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <Control
            data={'sessionTime'}
            name={'session'}
            time={this.state.sessionTime}
            increment={(name) => this.increment(name)}
            decrement={(name) => this.decrement(name)}
          />
          <Control
            data={'breakTime'}
            name={'break'}
            time={this.state.breakTime}
            increment={(name) => this.increment(name)}
            decrement={(name) => this.decrement(name)}
          />
        </div>
        <Timer
          data={this.state}
          start={() => this.start()}
          reset={() => this.reset()}
        />
      </div>
    );
  }
}

export default App;
