
import React from 'react';
import './beacons.scss';

class Choose extends React.Component {
  render() {
    return (
      <div>
        <input type="radio" name="trigType" value="靠近" onChange={this.props.update} />靠近
        <input type="radio" name="trigType" value="遠離" onChange={this.props.update} />遠離
        <input type="radio" name="trigType" value="停留" onChange={this.props.update} />停留
        <input type="text"  name="stayTime" onChange={this.props.update}/> 秒
      </div>
    );
  }
}
class Slider extends React.Component {
  render() {
    return (
      <div id="slider-label">
        <table width="100%">
          <tr>
            <td width="20%">近(&lt;2M)</td>
            <td width="20%">中(&lt;4M)</td>
            <td width="20%">遠(&lt;6M)</td>
            <td width="20%">超級遠(廣播模式)</td>
          </tr>
        </table>
        <div>
          <input type="range" name="setDist" min="0" max="3" step="1" 
                 onChange={this.props.update} />
        </div>
      </div>
    );
  }
}
class SetBeacon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txt: 'this is the state txt', 
      type: 0, stay: 0,
      distance: 0
    }
    this.updateTxt      = this.updateTxt.bind(this)
    this.updateType     = this.updateType.bind(this)
    this.updateDistance = this.updateDistance.bind(this)
  }
  updateTxt(e) {
    this.setState({txt: e.target.value})
  }
  updateType(e) {
    // 0:approach, 1:far away, 2:stay ?? secs
    if(e.target.name === "trigType")
      this.setState({type: e.target.value})
    if(e.target.name === "stayTime")
      this.setState({stay: e.target.value})    
  }
  updateDistance(e) {
    // 0~3: 2m 4m 6m broadcasting
    this.setState({distance: e.target.value });
  }
  getValue(){
    return this.state;
  }
  render() {
    return (
      <div className="row text-left">     
        <p>type:{this.state.type}, stay:{this.state.stay}, dist:{this.state.distance}</p>
        <div className="col-sm-12 col-md-6">
          <Choose update={this.updateType} />
        </div>
        <div className="col-sm-12 col-md-6">
          <Slider update={this.updateDistance} />
        </div>
      </div>
    )
  }
}
export default SetBeacon;