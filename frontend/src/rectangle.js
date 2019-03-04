import React from "react";

function Rectangle(props){
    return <div className="rectangle">
                <p>Current Value</p>
                <p className="widget-value">{props.data}</p>
            </div>
}

export default Rectangle;
