import {Component} from 'react'

import './index.css'

const updatingTimer = {
  isRunning: false,
  ElapsedTimeInSeconds: 0,
  timerInMinutes: 25,
}
class DigitalTimer extends Component {
  state = updatingTimer

  componentDidMount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimer = () => {
    const {timerInMinutes} = this.state

    if (timerInMinutes > 1) {
      this.setState(prevState => ({
        timerInMinutes: prevState.timerInMinutes - 1,
      }))
    }
  }

  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerInMinutes: prevState.timerInMinutes + 1,
    }))

  renderTimerLimitController = () => {
    const {timerInMinutes, ElapsedTimeInSeconds} = this.state
    const isButtonsDisabled = ElapsedTimeInSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-label">Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onDecreaseTimer}
            type="button"
          >
            -
          </button>
          <div className="limit-label-and-value-container">
            <p className="limit-value">{timerInMinutes}</p>
          </div>
          <button
            className="limit-controller-button"
            disabled={isButtonsDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(updatingTimer)
  }

  incrementTimer = () => {
    const {ElapsedTimeInSeconds, timerInMinutes} = this.state
    const isTimer = ElapsedTimeInSeconds === timerInMinutes * 60
    if (isTimer) {
      this.clearTimerInterval()
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({
        ElapsedTimeInSeconds: prevState.ElapsedTimeInSeconds + 1,
      }))
    }
  }

  startPauseTimer = () => {
    const {isRunning, ElapsedTimeInSeconds, timerInMinutes} = this.state
    const isCompleted = ElapsedTimeInSeconds === timerInMinutes * 60

    if (isCompleted) {
      this.setState({ElapsedTimeInSeconds: 0})
    }
    if (isRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimer, 1000)
    }
    return this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  renderTimeChanger = () => {
    const {isRunning} = this.state
    const startPauseImageUrl = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startPauseAltText = isRunning ? 'pause icon' : ' play icon'

    return (
      <div className="start-pause-container">
        <button
          className="start-pause-btn"
          onClick={this.startPauseTimer}
          type="button"
        >
          <img
            alt={startPauseAltText}
            className="start-img"
            src={startPauseImageUrl}
          />
          <p className="timer-label">{isRunning ? 'Pause' : 'Start'}</p>
        </button>

        <button type="button" className="start-pause-btn">
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="should be reset"
            className="start-img"
          />
          <p className="timer-label">Reset</p>
        </button>
      </div>
    )
  }

  renderDisplayTimerController = () => {
    const {timerInMinutes, ElapsedTimeInSeconds} = this.state
    const totalRemainingTime = timerInMinutes * 60 - ElapsedTimeInSeconds
    const minutes = Math.floor(totalRemainingTime / 60)
    const seconds = Math.floor(totalRemainingTime % 60)
    const newMinutes = minutes > 9 ? minutes : `0${minutes}`
    const newSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${newMinutes}:${newSeconds}`
  }

  render() {
    const {isRunning} = this.state
    const text = isRunning ? 'Running' : 'Paused'
    return (
      <div className="digital-timer-container">
        <h1 className="digital-heading">Digital Timer</h1>
        <div className="timer-main-container">
          <div className="display-timer">
            <div className="elapsed-time-container">
              <h1 className="time-display">
                {this.renderDisplayTimerController()}
              </h1>
              <p className="text-para">{text}</p>
            </div>
          </div>
          <div className="timer-change-container">
            {this.renderTimeChanger()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
