//import React, { Component } from 'react';
import {Label} from './containers/Label';
import {Visual} from './containers/Visual';
export const Button =(props) =>{
    return (
        <div className="panel panel-default">
            <Label 
                title={props.title} 
            />
            <Visual
                title={props.title} 
                src={props.visual_source} 
            />
        </div>
        );

}