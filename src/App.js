import React, { Component } from 'react';
import Timer from './components/timer'
import Control from './components/control'
import Beep from './components/beep'

class App extends Component {
  constructor() {
    super();
    this.state = {
      sessionTime: 25,
      breakTime: 5,
      running: false,
      changingTime:'',
      reset:false
    }
  }

  increment(name) {
    const { [name]: time, running } = this.state;
    if (time === 60) return;
    if (!running)
      this.setState({
        [name]: time + 1,
        changingTime:name,
        reset:false
      })
  }

  decrement(name) {
    const { [name]: time, running } = this.state;
    if (time === 1) return;
    if (!running)
      this.setState({
        [name]: time - 1,
        changingTime:name,
        reset:false
      })
  }

  startStop() {
    this.setState({
      running: this.state.running ? false : true,
      changingTime:'',
      reset:false
    })
  }

  reset() {
    this.setState({
      sessionTime: 25,
      breakTime: 5,
      running: false,
      changingTime:'',
      reset:true
    })
    //document.querySelector('#beep').load()
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
          startStop={() => this.startStop()}
          reset={() => this.reset()}
        />
      </div>
    );
  }
}

export default App;
