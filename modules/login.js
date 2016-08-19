import React from 'react';
import { hashHistory } from 'react-router';
import Loading from './components/loading';
import store from './store';
import { Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginFailed: false,
            isLoading: false
        }

        this.loginHandler = this.handleLogin.bind(this);
        this.loginFailedHandler = this.handleLoginFailed.bind(this);
    }

    handleAccount(e) {
        this.account = e.target.value;
    }

    handlePassword(e) {
        this.password = e.target.value;
    }

    onLogin(e) {
        this.setState({ isLoading: true });
        store.login(this.account, this.password);
    }

    handleLogin() {
        this.setState({ isLoading: false, isLoginFailed: false });
        hashHistory.push('/projects');
    }

    handleLoginFailed() {
        this.setState({ isLoading: false, isLoginFailed: true });
    }

    componentDidMount() {
        console.log('mount');
        store.addListener('LOGIN_SUCCESS', this.loginHandler);
        store.addListener('LOGIN_FAILED', this.loginFailedHandler);
    }

    componentWillUnmount() {
        store.removeListener('LOGIN_SUCCESS', this.loginHandler);
        store.removeListener('LOGIN_FAILED', this.loginFailedHandler);
    }

    render() {
        return <div id="login-container" className="container text-left">
            <div className="row text-center">
                <FormGroup controlId="formControlsText">
                    <FormControl ref="account" className="account" name="account" type="text" placeholder="Enter account" onChange={this.handleAccount.bind(this) } />
                </FormGroup>
                <FormGroup controlId="formControlsPassword">
                    <FormControl ref="pass" className="account" name="pwd" type="password" onChange={this.handlePassword.bind(this) }/>
                </FormGroup>
            </div>
            <div className="row text-center">
                <button className='btn btn-primary login' onClick={ this.onLogin.bind(this) }>登入</button>
                {
                    this.state.isLoginFailed ? <span className="warning">&nbsp; &nbsp; 登入失敗</span> : ""
                }
            </div>
        </div>;
    }
}