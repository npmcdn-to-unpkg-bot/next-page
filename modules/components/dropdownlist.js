import React from 'react';

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
            this.props.onChange(e.target.value);
        }
    }

    getSelectedValue(){
        return this.state.selectedValue;
    }

    render(){
        return <select defaultValue={this.state.selectedValue} onChange={this.handleChange.bind(this)}>
            {
                this.props.options.map(function(option){
                    return <option value={option.value}>{option.text}</option>
                })
            }
        </select>
    }
}