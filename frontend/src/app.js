import React from "react";
import Value from "./value";
import Rectangle from "./rectangle";
import "./style.css";
import Paho from 'paho-mqtt';

const TIMER=2*60;//2 minutes to score a goal before game resets

class App extends React.Component {

  state = {
    currentScore:{
      red:0,
      blue:0
    },
    gamesPlayed:0,
    goalsScored:0,
    resetTimer:{
      secondsRemaining:0,
      timeLeft:"00:00",
    },
    noiseLevel:"0 dB",
    teamStats:{
      red:50,
      blue:50
    }
  }
  intervalHandle;
  startCountDown = this.startCountDown.bind(this);
  tick = this.tick.bind(this);

  componentDidMount() {

    /////// FETCH INITIAL STATE FROM BACKEND
    // (DO LATER)


    /////// CONNECT TO MQTT BROKER
    var clientID = "clientID-" + parseInt(Math.random() * 100);
    var host = "127.0.0.1";//document.getElementById("host").value;
    var port = "1884";//document.getElementById("port").value;

    this.ws = new Paho.Client(host, Number(port), clientID);

    // Set callback handlers
    this.ws.onConnectionLost = (responseObject) => {
      console.log("onConnectionLost: Connection Lost");
      if (responseObject.errorCode !== 0) {
          console.log("onConnectionLost: " + responseObject.errorMessage);
      }
    }
    this.ws.onMessageArrived = (message) =>{
      console.log("onMessageArrived, Topic: " + message.destinationName);
      console.log("onMessageArrived, Payload: " + message.payloadString);

      if(message.payloadString === "score"){
        //+1 to ...
        var newScore = this.state.currentScore;
        var goals = this.state.goalsScored+1;
        var games = this.state.gamesPlayed;
        var resetTime = true;

        if(message.destinationName === "testy/red"){
          newScore.red++;
        }
        else if(message.destinationName === "testy/blue"){
          newScore.blue++;
        }

        //Check if a team won / game over
        if(newScore.red >= 10 || newScore.blue >= 10){
          games++;
          newScore.red=0;
          newScore.blue=0;
          resetTime = false;
        }

        this.setState({
          currentScore:newScore,
          goalsScored:goals,
          gamesPlayed:games
        })

        //restart timer
        clearInterval(this.intervalHandle);
        if(resetTime){
          this.startCountDown(TIMER);
        }
        else{//game over wait for next goal to start
          var remainingTime = this.convertSecondsToTimestr(0);

          var newTimerState = {
            secondsRemaining:0,
            timeLeft:remainingTime      
          };

          this.setState({
            resetTimer:newTimerState
          })
        }
        
      }
      
    }

    // Connect the client, if successful, call onConnect function
    this.ws.connect({ 
        onSuccess: ()=>{
          var topic = "testy/#";
          // Subscribe to the requested topic
          this.ws.subscribe(topic);
        }
    });

    //Start timer
    //this.startCountDown(goals);
  }

  componentWillUnmount() {
    console.log("Closing...")
    //this.ws.close();
    this.ws.disconnect();
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

      //Reset current score
      this.setState({
        currentScore:{
          red:0,
          blue:0
        }
      })
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
          <Rectangle header="Current Score" data={this.state.currentScore}/>
          <Value header="Games Played" data={this.state.gamesPlayed}/>          
          <Value header="Goals Scored" data={this.state.goalsScored}/>
        </div>
        <div className="rowC">          
          <Value header="Game Reset Timer" data={this.state.resetTimer.timeLeft}/>
          <Value header="Noise Level" data={this.state.noiseLevel}/>
          <Rectangle header="Wins" data={this.state.teamStats}/>
        </div>
      </div>
    );
  }
}

export default App;
