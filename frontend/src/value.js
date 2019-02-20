import React from "react";
//import { Line } from "react-chartjs-2";
//import './css/widget.css'

function Value(props){
    return <div className="container">
                <p className="widget">Current Value is {props.data}</p>
            </div>
}


//const Value = props => <Value data={props.data}/>;

export default Value;
