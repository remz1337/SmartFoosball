import React from "react";

function Rectangle(props){
    return <div className="container rectangle">
                <div>
                    <p>{props.header}</p>
                </div>
                <div className="rowC">   
                    <p className="widget-value red">{props.data.red}</p>
                    <p className="widget-value"> - </p>
                    <p className="widget-value blue">{props.data.blue}</p>
                </div>
            </div>
            
    
}

export default Rectangle;
