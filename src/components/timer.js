import React from 'react'

export default ({ data: { sessionTime, breakTime, active, timeLeft, seconds, percent }, start, reset }) => {
  let s = seconds >= 10 ? seconds : '0' + seconds
  let session = active === 'session'
  let activeTime = session ? sessionTime : breakTime
  let cover = percent * 100 / (activeTime * 60);
  return (
    <div id='timer'>
      <div id="background">
        <h1 id='timer-label'>{active}</h1>
        <h1 id='time-left'>{`${timeLeft >= 10 ? timeLeft : '0' + timeLeft}:${s}`}</h1>
        <button id='start_stop' onClick={start}>start/stop</button>
        <button id='reset' onClick={reset}>reset</button>
        <div
          id="timer-cover"
          style={{
            top: session ? cover + '%' : 100 - cover + '%',
            background: session ? 'green' : 'darkred'
          }}
        ></div>
      </div>
    </div>
  )
}


