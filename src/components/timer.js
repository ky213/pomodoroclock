import React, { Component } from 'react'


export default class Timer extends Component {
  state = {
    time: 25,
    seconds: 0,
    active: 'session',
    running: false
  }

   static getDerivedStateFromProps(nextProps, state) {
    const { active, running, time, seconds } = state
    const { sessionTime, breakTime, changingTime } = nextProps.data
    const session = active === 'session'
    if(changingTime)
    return {
      time:session ? sessionTime : breakTime,
      seconds:0
    }

    return state
  
  }

  startStop() {
    if (!this.state.running) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.setState((prevState, props) => {
          let { time, seconds, active } = prevState
          const { sessionTime, breakTime } = props.data
          const session = active === 'session'

          if (time === 0 && seconds === 0)
            return {
              time: session ? breakTime : sessionTime,
              active: session ? 'break' : 'session'
            }
          else
            return {
              time: seconds ? time : time - 1,
              seconds: seconds ? seconds - 1 : 59,
              running: true
            }
        })
      }, 1000)
      this.props.toggleRunningState(true, false)
    } else {
      this.setState({ running: false })
      this.props.toggleRunningState(false,false)
      clearInterval(this.timer)
    }
  }

  reset(){
    this.setState({
      seconds: 0,
      active: 'session',
      running: false
    })
    this.props.reset()
    clearInterval(this.timer)
  }
  
  render() {
    const { time, seconds, active } = this.state
    const { startStop, reset } = this.props;
    const sec = seconds >= 10 ? seconds : '0' + seconds
    const session = active === 'session'

    return (
      <div id='timer'>
        <div id="background">
          <h1 id='timer-label'>{active}</h1>
          <h1 id='time-left'>{`${time >= 10 ? time : '0' + time}:${sec}`}</h1>
          <button id='start_stop' onClick={() => this.startStop()}>start/stop</button>
          <button id='reset' onClick={() => this.reset()}>reset</button>
          <div
            id="timer-cover"
            style={{
              top: session ? 100 + '%' : 100 - 100 + '%',
              background: session ? 'green' : 'darkred'
            }}
          ></div>
        </div>
      </div>
    )

  }
}
