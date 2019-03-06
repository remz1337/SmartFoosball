import React from "react";
import Value from "./value";
import Rectangle from "./rectangle";
//import mqtt from "mqtt";
import "./style.css";
//import startConnect from "./test.js";
//import { Client, Message } from 'react-native-paho-mqtt';
//import WebSocket from 'react-websocket';
import Paho from 'paho-mqtt';
import startConnect from './test.js';
//import { subscribe } from 'mqtt-react';

class App extends React.Component {

  state = {
    currentScore:{
      red:1,
      blue:2
    },
    gamesPlayed:3,
    goalsScored:4,
    resetTimer:{
      secondsRemaining:0,
      timeLeft:"00:00",
    },
    noiseLevel:"20 dB", 
    latestValue:0
  }
  intervalHandle;
  startCountDown = this.startCountDown.bind(this);
  tick = this.tick.bind(this);


  //ws = new WebSocket("ws://localhost:1884");

  componentDidMount() {
    startConnect();

    /*
    //this.ws = new WebSocket("ws://10.0.2.15:1884");

    this.ws.onopen = () => {
      // on connecting, do nothing but log it to the console
      console.log('connected')
    }

    this.ws.onmessage = evt => {
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(evt.data)
      //this.addMessage(message)
      console.log("Message:"+message);
    }

    this.ws.onclose = () => {
      console.log('disconnected')
      // automatically try to reconnect on connection loss
      this.setState({
        ws: new WebSocket(URL),
      })
    }*/

    //Start timer
    this.startCountDown(30);
  }

  componentWillUnmount() {
    console.log("Closing...")
    //this.ws.close();
  }

  convertSecondsToTimestr(seconds){
    var res="00:00";

    var min = Math.floor(seconds / 60);
    var sec = seconds - (min * 60);

    if (sec < 10) {
        sec = "0" + sec;
    }
    if (min < 10) {
        min = "0" + min;
    }

    res = min + ":" + sec;

    return res;
  }

  tick() {
    var remainingSeconds = this.state.resetTimer.secondsRemaining;
    remainingSeconds--;

    if (remainingSeconds <= 0) {
      clearInterval(this.intervalHandle);
    }

    var remainingTime = this.convertSecondsToTimestr(remainingSeconds);
    
    var newTimerState = {
      secondsRemaining:remainingSeconds,
      timeLeft:remainingTime      
    };

    this.setState({
      resetTimer:newTimerState
    })
  }

  startCountDown(seconds) {
    var remainingTime = this.convertSecondsToTimestr(seconds);

    var newTimerState = {
      secondsRemaining:seconds,
      timeLeft:remainingTime      
    };

    this.setState({
      resetTimer:newTimerState
    })

    this.intervalHandle = setInterval(this.tick, 1000);
  }


  render() {
    return (
      <div id="main">
        <div className="rowC">          
          <Rectangle data={this.state.latestValue}/>
          <Value data={this.state.gamesPlayed}/>          
          <Value data={this.state.goalsScored}/>
        </div>
        <div className="rowC">          
          <Value data={this.state.resetTimer.timeLeft}/>
          <Value data={this.state.noiseLevel}/>
          <Rectangle data={this.state.latestValue}/>
        </div>
      </div>
    );
  }
}

export default App;
