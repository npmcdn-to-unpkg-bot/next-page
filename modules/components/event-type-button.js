import React from 'react';
import { FABButton,Checkbox } from 'react-mdl';

export default class EventTypeButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSelected: props.isSelected
        }
        this.isClicked = false;
    }

    componentWillReceiveProps(nextProps){
        this.setState({isSelected:nextProps.isSelected});
    }

    componentWillUpdate(nextProps, nextState){
        if(this.isClicked){
            this.isClicked = false;
            if(this.props.onChange){
                this.props.onChange(nextState.isSelected);
            }
        }
    }

    selectEvent(){
        this.isClicked = true;
        this.setState({isSelected:!this.state.isSelected});
    }

    render(){
        return <span>
            {
                this.state.isSelected?
                <span className="mdl-checkbox-container">
                    <Checkbox checked="true" onClick={this.selectEvent.bind(this)} />
                </span>:
                <FABButton colored className="mdl-eventtype" onClick={this.selectEvent.bind(this)}>
                    {this.props.eventType}
                </FABButton>
            }
        </span>
    }
}