import React from 'react';
import ReactDOM from 'react-dom';

class Clock3 extends React.Component{
  constructor(props){
    let time = new Date();
    super(props);
    this.state = {
      hours: time.getHours(),
      minutes: time.getMinutes(),
      seconds: time.getSeconds()
    }
    this.incrementTime = this.incrementTime.bind(this);
    this.parseString = this.parseString.bind(this);
    this.padding = this.padding.bind(this);
  }

  componentWillMount(){
    window.setInterval(this.incrementTime, 1000)
  }

  incrementTime(){
    let {seconds, minutes, hours} = this.state;
    seconds += 1;
    if(seconds > 59){
      seconds = 0;
      minutes += 1;
    }
    if(minutes > 59){
      minutes = 0;
      hours += 1;
    }
    if(hours > 23){
      hours = 0;
    }
    this.setState({seconds, minutes, hours})
  }

  parseString(){
    let {seconds, minutes, hours} = this.state;
    return hours.toString() + ":" + this.padding(minutes) + ":" + this.padding(seconds);
  }

  padding(num){
    if(num < 10){
      return "0" + num.toString();
    } else {
      return num.toString();
    }
  }

  render(){
    return (<div>{this.parseString()}
    <Clock12Hours state={this.state} dispatch={{padding: this.padding}}/></div>)
  }
}

const Clock12Hours = (props) => (
  <div>{props.state.hours % 12}:{props.dispatch.padding(props.state.minutes)}:{props.dispatch.padding(props.state.seconds)} {(props.state.hours >= 12) ? "PM" : "AM"}</div>
)

document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById("root");
  ReactDOM.render(<Clock3 />, root);
})
