import React from 'react';
import SingleSelect from './single-select';

export default class RangeSelector extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            range: props.range
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({range:nextProps.range});
    }

    getRangeText(range){
        switch(range){
            case 2:
                return '近';
            case 4:
                return '中';
            case 6:
                return '遠';
            case 999:
                return '廣播';
            default:
                return '';
        }
    }

    handleChange(range){
        this.setState({range:range});
    }

    getValue(){
        return this.state.range;
    }

    render(){
        return <span>
            <SingleSelect options={
                [
                    {text:'近', value:2},
                    {text:'中', value:4},
                    {text:'遠', value:6},
                    {text:'廣播', value:999}
                ]
            } selectedValue={this.state.range} onChange={this.handleChange.bind(this)} />
        </span>
    }
}