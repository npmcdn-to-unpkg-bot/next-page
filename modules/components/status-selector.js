import React from 'react';
import SingleSelect from './single-select';

export default class StatusSelector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            status: props.status,
            stayTime: props.stayTime
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({status:nextProps.status, stayTime:nextProps.stayTime});
    }

    getValue(){
        return {
            status:this.state.status,
            stayTime:this.state.stayTime
        }
    }

    handleChange(status){
        this.setState({status:status});
    }

    handleStayChange(e){
        let stayTime = e.target.value;
        this.setState({stayTime:stayTime});
    }

    render(){
        let isStay = this.state.status == '停留';

        return <span>
            <SingleSelect options={
                [
                    {text:'靠近', value:'靠近'},
                    {text:'遠離', value:'遠離'},
                    {text:'停留', value:'停留'}
                ]
            } selectedValue={this.state.status} onChange={this.handleChange.bind(this)} />
            <span className={isStay?'':'hidden'}>
                <input type="number" className="period-input" defaultValue={this.state.stayTime} onChange={this.handleStayChange.bind(this)} /> 秒
            </span> 
        </span>
    }
}