import React from 'react';

import '../NumberDisplay';
import NumberDisplay from '../NumberDisplay';
import SecondsDisplay from '../SecondsDisplay';

export default class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.interval = null;
    this.time = 0;

    this.lastUpdate = Date.now();
    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      cs: 0,
      running: false,
      inProgress: false,
    };
  }

  componentWillMount() {
    const time = localStorage.getItem('time');
    if (time === null || isNaN(parseInt(time, 10))) return;
    this.time = parseInt(time, 10);
    if (this.time === 0) return;
    if (localStorage.getItem('running') && localStorage.getItem('lastTime')) {
      const toUpdate = parseInt(localStorage.getItem('lastTime'), 10);
      this.time += Date.now() - toUpdate;
      this.onStart();
    }
    this.setState({
      ...this.getTimeUpdate(),
      inProgress: true,
    });
  }

  update() {
    const dt = Date.now() - this.lastUpdate;
    this.lastUpdate = Date.now();

    this.time += dt;
    this.setState({
      ...this.getTimeUpdate(),
    });
    this.saveTime();
  }
  saveTime(running = true) {
    if (this.time > 0) {
      localStorage.setItem('time', this.time.toString());
    } else {
      localStorage.removeItem('time');
    }
    if (running) {
      localStorage.setItem('time', this.time.toString());
      localStorage.setItem('running', true.toString());
      localStorage.setItem('lastTime', Date.now().toString());
    } else {
      localStorage.removeItem('running');
      localStorage.removeItem('lastTime');
    }
  }
  getTimeUpdate() {
    return {
      hours: Math.floor((this.time / 1000 / 60 / 60) % 100),
      minutes: Math.floor((this.time / 1000 / 60) % 60),
      seconds: Math.floor((this.time / 1000) % 60),
      cs: Math.floor((this.time / 10) % 100),
    };
  }

  onPause() {
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      running: false,
    });
    this.saveTime(false);
  }
  onStart() {
    this.lastUpdate = Date.now();
    this.interval = setInterval(this.update.bind(this), 30);
    this.setState({
      running: true,
      inProgress: true,
    });
    this.saveTime();
  }
  onReset() {
    this.time = 0;
    this.saveTime();
    clearInterval(this.interval);
    this.interval = null;
    this.setState({
      inProgress: false,
      running: false,
      ...this.getTimeUpdate(),
    });
  }

  render() {
    return (
      <div className="timer">
        <div className="display">
          <NumberDisplay label="hours" amount={this.state.hours} />
          <NumberDisplay label="minutes" amount={this.state.minutes} />
          <SecondsDisplay seconds={this.state.seconds} cs={this.state.cs} />
        </div>
        <div className="controls">
          {
            this.state.running ?
              <button className="start-stop secondary" onClick={this.onPause.bind(this)}>Pause</button>
              : <button className="start-stop primary" onClick={this.onStart.bind(this)} >
                { this.state.inProgress ? 'Continue' : 'Start' }
              </button>
          }
          {
            this.state.inProgress ?
            <button className="reset secondary" onClick={this.onReset.bind(this)}>Reset</button>
            : null
          }
        </div>
      </div>
    )
  }
}