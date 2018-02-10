import React from 'react'
import { componentFromStream } from 'recompose'
import { Observable } from 'rxjs'

let App = componentFromStream(props$ => {
  return Observable.interval(1000).map(i => <div>{i}</div>)
})

const now = new Date().getTime()
const format = (time) => {
  if (time < 0) return '00'
  return time < 10 ? '0' + time : time
}
// countdown
App = componentFromStream(props$ => {
  const init = 10
  return Observable.interval(1000).map(i => {
    return <div>{init - i < 0 ? 0 : init - i }</div>
  })
})

// clock
App = componentFromStream(props$ => {
  return Observable.interval(1000).map(i => {
    const time = new Date(now - i * 1000)
    const hour = format(time.getHours())
    const minute = format(time.getMinutes())
    const second = format(time.getSeconds())
    return <div>{hour + ':' + minute + ':' + second}</div>
  }
  )
})

// 倒计时 10min
const duration = 10 * 60
const speed = 500
App = componentFromStream(props$ => {
  return Observable.interval(speed).map(i => {
    const time = duration - i
    const minute = format(Math.floor(time / 60))
    const second = format(time % 60)
    return <div>{minute + ':' + second}</div>
  })
})

export default App
