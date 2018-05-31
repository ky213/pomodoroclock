import React from 'react'

export default ({ data: { session: { run: work } }, start,reset }) => {
  return (
    <div onClick={start} id='timer'>
      <div id="background">
        <h1 id='timer-label'>{work ? 'Session' : 'Break'}</h1>
        <h1 id='time-left'>{'25:00'}</h1>
        <button id='start_stop' onClick={start}>start/stop</button>
        <button id='reset' onClick={reset}>reset</button>
        <div id="timer-cover"></div>
      </div>
    </div>
  )
}
