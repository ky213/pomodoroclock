import React, { Component } from 'react'
import { changeExt } from 'upath';

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: 25,
      seconds: 0,
      active: 'session'
    }
    this.timer = null
  }

  componentWillReceiveProps(nextProps) {
    let { data: { sessionTime, breakTime, running, changingTime, reset } } = nextProps
    const session = this.state.active === 'session'

    if (changingTime === 'sessionTime' && session)
      this.setState({
        time: sessionTime,
        seconds: 0
      })
    if (changingTime === 'breakTime' && !session)
      this.setState({
        time: breakTime,
        seconds: 0
      })

    if (reset) {
      this.setState({
        time: 25,
        seconds: 0,
        active: 'session'
      })
      clearInterval(this.timer)
      running = false
    }
    if (running)
      this.timer = setInterval(() => {
        let { time, seconds, active } = this.state

        this.setState({
          time: seconds ? time : time - 1,
          seconds: seconds ? seconds - 1 : 59
        })

        if (!time && !seconds)
          this.setState({
            time: session ? breakTime : sessionTime,
            seconds: 0,
            active: session ? 'break' : 'session'
          })
      }, 1000)
    else
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
          <button id='start_stop' onClick={startStop}>start/stop</button>
          <button id='reset' onClick={reset}>reset</button>
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
