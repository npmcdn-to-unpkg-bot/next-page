import React from 'react';

export default class StepSelector extends React.Component {
    constructor(props){
        super(props);
    }

    switchStep(selectedStep){
        this.props.switchStep(selectedStep);
    }

    render(){
        return <div className="selector-container">
            <div className="row">
                <div className="step-stripe"></div>
                <span className="col-xs-2">
                </span>
                <span className="col-xs-2">
                    <span className={(this.props.selectedStep==1?"step-highlight":"")+" circular-button"} onClick={this.switchStep.bind(this,'1')}>1</span>
                </span>
                <span className="col-xs-2">
                    <span className={(this.props.selectedStep==2?"step-highlight":"")+" circular-button"} onClick={this.switchStep.bind(this,'2')}>2</span>
                </span>
                <span className="col-xs-2">
                    <span className={(this.props.selectedStep==3?"step-highlight":"")+" circular-button"} onClick={this.switchStep.bind(this,'3')}>3</span>
                </span>
                <span className="col-xs-2">
                    <span className={(this.props.selectedStep==4?"step-highlight":"")+" circular-button"} onClick={this.switchStep.bind(this,'4')}>4</span>
                </span>
                <span className="col-xs-2">
                </span>
            </div>
        </div>       
    }
}