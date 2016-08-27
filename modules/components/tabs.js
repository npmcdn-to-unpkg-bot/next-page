import React from 'react';

class Tab extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        let tabClass = this.props.isSelected?'highlight-tab':'normal-tab';
        return <span onClick={this.props.onClick} className={tabClass}>{this.props.name}</span>
    }    
}

export default class Tabs extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            selectedTab: this.props.selectedTab || 0
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({selectedTab:nextProps.selectedTab || 0});
    }

    selectTab(index){
        this.setState({selectedTab:index});
        if(this.props.onChange){
            this.props.onChange(index);
        }
    }

    getSelectedTab(){
        return this.state.selectedTab;
    }

    getSelectedTabName(){
        return this.props.tabNames[this.state.selectedTab];
    }

    render(){
        let m = this;
        return <div className='tabbar'>
        {
            this.props.tabNames.map(function(tabName, index){
                let selected = (index == m.state.selectedTab);
                return <Tab name={tabName} onClick={m.selectTab.bind(m, index)} isSelected={selected} />
            })
        }
        </div>;
    }
}