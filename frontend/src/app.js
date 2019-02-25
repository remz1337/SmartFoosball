/*import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
*/

import React from "react";
//import { render } from "react-dom";
import { withStyles } from "@material-ui/core/styles";
//import Chart from "./chart";
import Value from "./value";
import "./style.css";

const styles = theme => ({
  "chart-container": {
    height: 400
  }
});

class App extends React.Component {
  state = {
    lineChartData: {
      labels: [],
      datasets: [
        {
          type: "line",
          label: "BTC-USD",
          backgroundColor: "rgba(0, 0, 0, 0)",
          borderColor: this.props.theme.palette.primary.main,
          pointBackgroundColor: this.props.theme.palette.secondary.main,
          pointBorderColor: this.props.theme.palette.secondary.main,
          borderWidth: "2",
          lineTension: 0.45,
          data: []
        }
      ]
    },
    lineChartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      tooltips: {
        enabled: true
      },
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            }
          }
        ]
      }
    },
    latestValue:0
  };

  componentDidMount() {
    const subscribe = {
      type: "subscribe",
      channels: [
        {
          name: "ticker",
          product_ids: ["BTC-USD"]
        }
      ]
    };

    this.ws = new WebSocket("wss://ws-feed.gdax.com");

    this.ws.onopen = () => {
      this.ws.send(JSON.stringify(subscribe));
    };

    this.ws.onmessage = e => {
      const value = JSON.parse(e.data);
      if (value.type !== "ticker") {
        return;
      }

      const oldBtcDataSet = this.state.lineChartData.datasets[0];
      const newBtcDataSet = { ...oldBtcDataSet };
      newBtcDataSet.data.push(value.price);

      const newChartData = {
        ...this.state.lineChartData,
        datasets: [newBtcDataSet],
        labels: this.state.lineChartData.labels.concat(
          new Date().toLocaleTimeString()
        )
      };
      this.setState({ lineChartData: newChartData, latestValue:value.price });
    };
  }

  componentWillUnmount() {
    this.ws.close();
  }

  render() {
    //const { classes } = this.props;

    //<div className={classes["chart-container"]}>          
    //<Chart data={this.state.lineChartData} options={this.state.lineChartOptions}/>
    return (
      <div id="main">
        <div className="rowC">          
          <Value data={this.state.latestValue}/>
          <Value data={this.state.latestValue}/>
          <Value data={this.state.latestValue}/>          
          <Value data={this.state.latestValue}/>  
          <Value data={this.state.latestValue}/>  
        </div>
        <div className="rowC">          
          <Value data={this.state.latestValue}/>
          <Value data={this.state.latestValue}/>
        </div>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(App);
