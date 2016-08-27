import React from 'react';

// 複選元件
// 範例: <MultiSelect ref="select" options={options} />
// options = [{text:"optionName",value:"optionValue"},...]
// 取值: this.refs.select.getSelectedValues();
//      this.refs.select.getSelectedItems();

class MultiSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedValues: props.selectedValues || [],
            selectedItems: [],
            options: props.options
        }

        //clear the state
        if (this.state.options != null) {
            var {selectedValues} = this.state;
            this.state.options.map(function (option) {
                option.selected = (selectedValues.indexOf(option.value) > -1);
            })

            this.state.selectedItems = this.state.options.filter(function (option) {
                return (selectedValues.indexOf(option.value) > -1);
            })
        }
    }

    handleChange(e) {
        var selectedValue = e.target.value;
        var options = Array.from(this.state.options);
        var selectedValues = Array.from(this.state.selectedValues);
        var selectedItems = [];

        if (!(selectedValues.indexOf(selectedValue) > -1)){
            selectedValues.push(selectedValue);
        } else if (selectedValues.indexOf(selectedValue) > -1) {
            var index = selectedValues.indexOf(selectedValue);
            selectedValues.splice(index, 1);
        }

        options.map(function (option) {
            if (selectedValues.indexOf(option.value) > -1) {
                option.selected = true;
                selectedItems.push(option);
            }
            else
                option.selected = false;
        });
        this.setState({ selectedItems: selectedItems, selectedValues: selectedValues, options: options });
    }

    getSelectedValues(){
        return this.state.selectedValues;
    }

    getSelectedItems(){
        return this.state.selectedItems;
    }

    render() {
        var {isRadio} = this.props;
        if (this.props.options == null || this.props.options == [])
            return <div></div>;
        else {
            var m = this;
            return <div>
                {this.state.options.map(function (option, index) {
                    return  <span key={index}>
                              <input  type      = {isRadio?'radio':'checkbox'} 
                                      value     = {option.value} 
                                      checked   = {option.selected} 
                                      onChange  = {m.handleChange.bind(m) } />
                                &nbsp;
                              <span>{option.text}</span>
                                &nbsp;
                            </span>;
                })}
            </div>;
        }
    }
}

export default MultiSelect;