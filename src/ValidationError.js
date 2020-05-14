import React from 'react';

export default function ValidationError(props){
    if(props.message){
        return (
            <div className="error">Error! {props.message}</div>
        );
    }
    return <></>
}