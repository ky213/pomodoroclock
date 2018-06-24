import React, { Component } from 'react'
import Beep from './beep'



export default class Timer extends Component {
  state = {
    time: 25,
    seconds: 0,
    active: 'session',
    running: false,
    progress:0
  }

  static getDerivedStateFromProps(nextProps, state) {
    const { active, running, time, seconds } = state
    const { sessionTime, breakTime, changingTime } = nextProps.data
    const session = active === 'session'
    if (changingTime)
      return {
        time: session ? sessionTime : breakTime,
        seconds: 0
      }

    return state

  }

  startStop() {
    if (!this.state.running) {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        this.setState((prevState, props) => {
          let { time, seconds, active, progress } = prevState
          const { sessionTime, breakTime } = props.data
          const session = active === 'session'

          if (time === 0 && seconds === 0)
            return {
              time: session ? breakTime : sessionTime,
              active: session ? 'break' : 'session',
              progress:0
            }
          else
            return {
              time: seconds ? time : time - 1,
              seconds: seconds ? seconds - 1 : 59,
              running: true,
              progress: progress+1
            }
        })
      }, 1000)
      this.props.toggleRunningState(true, false)
    } else {
      this.setState({ running: false })
      this.props.toggleRunningState(false, false)
      clearInterval(this.timer)
    }
  }

  reset() {
    this.setState({
      seconds: 0,
      active: 'session',
      running: false,
      progress:0
    })
    this.props.reset()
    clearInterval(this.timer)
  }

  render() {
    const { time, seconds, active, progress } = this.state
    const { data: { sessionTime, breakTime }, startStop, reset } = this.props;
    const MM = time >= 10 ? time : '0' + time
    const SS = seconds >= 10 ? seconds : '0' + seconds
    const session = active === 'session'
    const activeTime = session ? sessionTime : breakTime 
    const P = (progress/(activeTime*60) ) * 100

    return (
      <div id='timer'>
        <div id="background">
          <h1 id='timer-label'>{active}</h1>
          <h1 id='time-left'>{`${MM}:${SS}`}</h1>
          <button id='start_stop' onClick={() => this.startStop()}>start/stop</button>
          <button id='reset' onClick={() => this.reset()}>reset</button>
          <div
            id="timer-cover"
            style={{
              top: session ? P + '%' : 100 - P + '%',
              background: session ? 'green' : 'darkred'
            }}
          ></div>
        </div>
        <Beep progress={P}/>
      </div>
    )

  }
}
