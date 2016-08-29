import React from 'react';

// 單選元件
// 範例: <SingleSelect ref="select" options={options} />
// options = [{text:"optionName",value:"optionValue"},...]
// 取值: this.refs.select.getSelectedValue();
//      this.refs.select.getSelectedItem();

class SingleSelect extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedValue: props.selectedValue,
            selectedItem: {},
            options: props.options
        }

        //clear the state
        if(this.state.options != null){
            this.state.options.map(function(option){
                option.selected = false;
            })

            if(this.state.selectedValue != null){
                var selectedValue = this.state.selectedValue;
                var selectedItem = this.getSelectedItemByValue(selectedValue);

                if(selectedItem != null) {
                    selectedItem.selected = true;
                }
                this.state.selectedItem = selectedItem;
            }
        }

        this.isClicked = false;
    }

    handleChange(e){
        this.isClicked = true;
        if(e.target.checked){
            var selectedValue = e.target.value;
            var options = Array.from(this.state.options);
            var selectedItem = null;
            options.map(function(option){
                if(option.value == selectedValue){
                    option.selected = true;
                    selectedItem = option;
                }
                else
                    option.selected = false;
            });
            this.setState({selectedItem: selectedItem, selectedValue:selectedValue, options: options });
        }
    }

    getSelectedItemByValue(selectedValue){
        var selectedItems = this.state.options.filter(function(option){
            return option.value == selectedValue;
        });
        if(selectedItems != null && selectedItems.length > 0){
            return selectedItems[0];
        } else
            return null;        
    }

    getSelectedValue(){
        return this.state.selectedValue;
    }

    getSelectedItem(){
        return this.state.selectedItem;
    }

    componentWillUpdate(nextProps,nextState){
        if(this.isClicked){
            this.isClicked = false;
            if(this.props.onChange){
                this.props.onChange(nextState.selectedValue);
            }
        }
    }

    render(){
        var {isRadio} = this.props;
        if(this.props.options == null || this.props.options == [])
            return <div></div>;
        else 
        {
          var m = this;
          return <div>
              {this.state.options.map(function(option, index) {
                return  <span key={index} >
                          <input 
                              type    = {isRadio? 'radio':'checkbox'}
                              value   = {option.value}
                              checked = {option.selected} 
                              onChange= {m.handleChange.bind(m)} />&nbsp;
                          <span>{option.text}</span>&nbsp;
                        </span>;
              })}
            </div>;
        }
    }
} 

export default SingleSelect;