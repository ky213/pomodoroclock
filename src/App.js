import React, { Component } from 'react';
import Timer from './components/timer'
import Control from './components/control'

class App extends Component {
  constructor() {
    super();
    this.state = {
      session: {
        run: true,
        time: 25
      },
      break: {
        run: false,
        time: 5
      }
    }
  }

  increment(name) {
    const { [name]: { time } } = this.state;
    if (time === 30) return;
    this.setState({
      [name]: { time: time + 1 }
    })

  }

  decrement(name) {
    const { [name]: { time } } = this.state;
    if (time === 1) return;
    this.setState({
      [name]: { time: time - 1 }
    })
  }

  start() {
    const { session: { time: workTime } } = this.state
    const { break: { time: breakTime } } = this.state

    alert('Start!!')
  }

  reset(){
    alert('Reset!!!')
  }
  render() {
    return (
      <div className="App">
        <div className="controls">
          <Control
            name={'session'}
            state={this.state.session.time}
            increment={(name) => this.increment(name)}
            decrement={(name) => this.decrement(name)}
          />
          <Control
            name={'break'}
            state={this.state.break.time}
            increment={(name) => this.increment(name)}
            decrement={(name) => this.decrement(name)}
          />
        </div>
        <Timer 
        data ={this.state} 
        start={() => this.start()} 
        reset={()=>this.reset()}
        />
      </div>
    );
  }
}

export default App;
