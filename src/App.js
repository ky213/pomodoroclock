import React, { Component } from 'react';
import Timer from './components/timer'
import Control from './components/control'

class App extends Component {
  constructor() {
    super();
    this.state = {
      work: {
        run: false,
        time: 1
      },
      break: {
        run: false,
        time: 1
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

  render() {
    return (
      <div className="App">
        <div className="controls">
          <Control
            name={'work'}
            state={this.state.work.time}
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
        <Timer />
      </div>
    );
  }
}

export default App;
