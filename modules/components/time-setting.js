
import React from 'react';
import DateTimeField from "react-bootstrap-datetimepicker";

class SetTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: this.props.date || "2016-07-04",
      format: "YYYY-MM-DD",
      inputFormat: "DD/MM/YYYY",
      mode: "date"
    };
  }

  handleChange(newDate) {
    console.log("newDate", newDate);
    this.setState({date: newDate});
  }

  getValue(){
    return this.state.date;
  }

  render() {
    const {date, format, mode, inputFormat} = this.state;
    return <DateTimeField
      dateTime={date}
      format={format}
      viewMode={mode}
      inputFormat={inputFormat}
      onChange={this.handleChange.bind(this)}
    
    />;
  }
}


export default SetTime;