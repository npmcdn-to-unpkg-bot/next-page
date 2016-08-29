import React from 'react';

export default class TimeInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time: this.props.time || '0000'
        }
    }

    getHour(){
        if(this.state.time.length != 4) return '0000';
        else return this.state.time.substring(0,2);
    }

    getMiniute(){
        if(this.state.time.length != 4) return '0000';
        else return this.state.time.substring(2,4);
    }

    getTime(){
        return this.state.time;
    }

    getNumberWithLeadingZero(n){
        n = parseInt(n);
        if(n < 10) return '0'+n.toString();
        else return n.toString();
    }

    handleChange(e){
        let hour = this.getNumberWithLeadingZero(this.refs.hour.value);
        let miniute = this.getNumberWithLeadingZero(this.refs.miniute.value);

        this.setState({time:hour+miniute});
        this.refs.hour.value = hour;
        this.refs.miniute.value = miniute;
    }

    componentWillReceiveProps(nextProps){
        this.setState({time:nextProps.time});
    }

    render(){
        let hour = this.getHour()
        let miniute = this.getMiniute();

        return <span>
            <input type="number" className="time-input" ref="hour" min="0" max="23" defaultValue={hour} onChange={this.handleChange.bind(this)} /> 時 
            <input type="number" className="time-input" ref="miniute" min="0" max="59" defaultValue={miniute} onChange={this.handleChange.bind(this)} /> 分
        </span>
    }
}