import React from 'react';

export default class PeriodInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            period:props.period,         //系統單位秒
            unit:'秒',                   //預設單位分
            _period:Math.round(props.period/1,2)
        }
    }

    componentWillReceiveProps(nextProps){
        let period = nextProps.period;
        let unit = '秒';
        let _period = Math.round(nextProps.period/3600,2);

        this.setState({period:period,unit:unit,_period:_period});
    }

    getUnitValue(unit){
        let seconds = 3600;

        switch(unit){
            case '秒':
                seconds = 1;
                break;
            case '分':
                seconds = 60;
                break;
            case '時':
                seconds = 3600;
                break;            
        }

        return seconds;
    }

    changeUnit(e){
        let unit = e.target.value;
        let seconds = this.getUnitValue(unit);
        let _period = this.state.period/seconds;

        this.setState({_period:_period, unit:unit});
        this.refs.period.value = Math.round(_period);
    }

    handleChange(e){
        let _period = e.target.value;
        let seconds = this.getUnitValue(this.state.unit);
        let period = _period * seconds;

        this.setState({_period:_period, period:period});
    }

    getValue(){
        let seconds = this.getUnitValue(this.state.unit);
        let period = this.state._period * seconds;

        return period;
    }

    render(){
        return <span>
            每 <input ref="period" className="period-input" type="number" defaultValue={this.state._period} onChange={this.handleChange.bind(this)} />
            <select ref="unit" defaultValue={this.state.unit} onChange={this.changeUnit.bind(this)}>
                <option value="秒">秒</option>
                <option value="分">分</option>
                <option value="時">時</option>
            </select> 執行一次
        </span>
    }
}