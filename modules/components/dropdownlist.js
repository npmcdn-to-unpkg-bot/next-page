import React from 'react';
import store from '../store';

export default class DropDownList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedValue: this.props.selectedValue
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({selectedValue:nextProps.selectedValue});
    }

    handleChange(e){
        this.setState({selectedValue:e.target.value});

        if(this.props.onChange){
            this.props.onChange(this.getSelectedValue());
        }
    }

    getSelectedValue(){
        let selectedOption = this.refs.select.options[this.refs.select.options.selectedIndex];

        if(selectedOption) 
            return selectedOption.value;
        else
            return null;
        //return this.state.selectedValue;
    }

    render(){
        return <select ref="select" defaultValue={this.state.selectedValue} onChange={this.handleChange.bind(this)}>
            {
                this.props.options.map(function(option, index){
                    return <option value={option.value}>{option.text}</option>
                })
            }
        </select>
    }
}