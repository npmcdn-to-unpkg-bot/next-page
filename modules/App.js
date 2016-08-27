import React from 'react'
import { hashHistory } from 'react-router'
import DropdownMenu from 'react-dd-menu';
import { LinkContainer } from 'react-router-bootstrap';
import Home from './Home'
import { AddStep } from './add-step'
import DropDownList from './components/dropdownlist';
import BeaconMap from './components/beacon-map';
import TopMenu from './components/top-menu';
import constants from '../constants';
import store from './store';
import menuimg from '../images/menu.png';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false,
      userType: ''
    }
  }

  addEvent() {
    store.newEvent();
    hashHistory.push('/1/1');
  }

  toggle() {
    let project = store.getProject();
    let userType = '';
    if(project) userType = project.ProjectOwnershipTag || '';

    console.log('toggle', project,userType);
    
    this.setState({ isMenuOpen: !this.state.isMenuOpen, userType: userType });
  };

  close() {
    this.setState({ isMenuOpen: false });
  };

  click() {
    console.log('You clicked an item');
  };

  selectCommand(command){
    this.toggle();
    if(command == '場域選擇') this.selectOrg();
    else if(command == '登出') this.logout();
  }

  selectOrg() {
    hashHistory.push('/orgs');
  }

  logout() {
    store.clear();
    hashHistory.push('/');
  }

  render() {
    let menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close.bind(this),
      align: 'right',
      toggle: <div></div>,
      openOnMouseover: true
    };

    let m = this;

    return <div>
      <TopMenu isOpen={this.state.isMenuOpen} onChange={this.selectCommand.bind(this)} userType={this.state.userType} />
      <span className="app-title">
        {
          this.props.location.pathname != '/' ? <span className="top-menu" onClick={this.toggle.bind(this)}>
            <img src={menuimg} />
          </span> : ""
        }
        &nbsp;
        <span className="title-text">中華RWD事件編輯App</span>
      </span>
      {this.props.children}
    </div>;
  }
}
export default App;