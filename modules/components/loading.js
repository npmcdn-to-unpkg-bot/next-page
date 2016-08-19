import React from 'react';
import spinner from '../../images/loading_spinner.gif';

export default class Loading extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <span className="loading">
            {
                this.props.isLoading ? <img src={spinner} width="35" /> : ""
            }
            &nbsp;
            {
                this.props.isLoading ? <span className="message">{this.props.message}</span>:""
            }
        </span>;
    }
}