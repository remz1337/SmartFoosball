import React from "react";
//import { Line } from "react-chartjs-2";
//import './css/widget.css'

function Value(props){
    return <div className="container">
                <div>
                    <p>{props.header}</p>
                </div>
                <div className="rowC">
                    <p className="widget-value">{props.data}</p>
                </div>
            </div>
}


//const Value = props => <Value data={props.data}/>;

export default Value;
