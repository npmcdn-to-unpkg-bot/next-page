import React from 'react'
import { hashHistory } from 'react-router'
import DropdownMenu from 'react-dd-menu';
import { LinkContainer } from 'react-router-bootstrap';
import Home from './Home'
import { AddStep } from './add-step'
import DropDownList from './components/dropdownlist';
import store from './store';
import menuimg from '../images/menu.png';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuOpen: false
    }
  }

  addEvent() {
    store.newEvent();
    hashHistory.push('/1/1');
  }

  toggle() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  close() {
    this.setState({ isMenuOpen: false });
  };

  click() {
    console.log('You clicked an item');
  };

  selectOrg(){
    hashHistory.push('/projects');
  }

  addEvent(){
    // alert('新增事件');
    // hashHistory.push('/');
  }

  logout(){
    store.clear();
    hashHistory.push('/');
  }

  sayHello(){
    alert('hello');
  }

  render() {
    let menuOptions = {
      isOpen: this.state.isMenuOpen,
      close: this.close.bind(this),
      align: 'right',
      toggle:<div></div>,
      openOnMouseover: true
    };

    let m = this;

    return <div>
      <span className="app-title">
      {
        this.props.location.pathname != '/'?<span className="top-menu" onClick={this.addEvent.bind(this) } onMouseOver={this.toggle.bind(this) } onMouseOut={this.toggle.bind(this) }>
          <img src={menuimg} />
          <DropdownMenu className="dd-menu" {...menuOptions} >
              <div onClick={this.selectOrg.bind(this)}>選擇場域</div>
              <div onClick={this.logout.bind(this)}>登出</div>
          </DropdownMenu>
        </span>:""
      }
      &nbsp; 
        <span className="title-text">中華RWD事件編輯App</span>
      </span>
      {this.props.children}
    </div>;
  }
}
export default App;