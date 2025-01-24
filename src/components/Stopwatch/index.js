import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementTimeElapsedInSeconds = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  onClickStart = () => {
    this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onClickStop = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      this.clearTimeInterval()
      this.setState(prevState => ({
        isTimerRunning: !prevState.isTimerRunning,
      }))
    }
  }

  onClickReset = () => {
    const {isTimerRunning} = this.state
    if (!isTimerRunning) {
      this.clearTimeInterval()
      this.setState({
        isTimerRunning: false,
        timeElapsedInSeconds: 0,
      })
    }
  }

  renderTimer = () => {
    const {timeElapsedInSeconds} = this.state
    const minutes = Math.floor(timeElapsedInSeconds / 60)
    const seconds = Math.floor(timeElapsedInSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="heading">Stopwatch</h1>
        <div className="stopwatch-container">
          <div className="timer-label-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="timer-image"
            />
            <p className="timer-label">Timer</p>
          </div>
          <h1 className="timer">{this.renderTimer()}</h1>
          <div className="buttons-container">
            <button
              type="button"
              className="button start"
              onClick={this.onClickStart}
            >
              Start
            </button>
            <button
              type="button"
              className="button stop"
              onClick={this.onClickStop}
            >
              Stop
            </button>
            <button
              type="button"
              className="button reset"
              onClick={this.onClickReset}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
