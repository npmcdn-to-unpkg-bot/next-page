import React from 'react';
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Step1, Step2, Step3, Step4, Step5 } from './pagelayout';

export class AddStep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            types : [{ev:1, name:'一般設定',alias:'std', steps:[0,1,2,3,4,5]},
                    {ev:2, name:'廣告設定',alias:'adv', steps:[0,1,2,4,5]},
                    {ev:3, name:'定位設定',alias:'loc', steps:[0,1,2,3,4,5]},
                    {ev:4, name:'客製化設定',alias:'cus', steps:[0,1,2,3,4,5]}],
            steps : ['設定事件','設定負責群組/Beacon','設定執行日期與時間','確認設定與發佈','發佈成功'],
            btns : ['S1','S2','S3','S4','S5']
        }
    }
    render() {
        //ev: 1 ~ 4 (Events)
        var ev = parseInt(this.props.params.ev);
        //id: 1 ~ 5 (Steps)
        var id = parseInt(this.props.params.id);
        var back = '/';
        var type = this.state.types[ev-1];
        var stepIndex = type.steps.indexOf(id);
        var prev = '/'+ev.toString() + '/' + type.steps[stepIndex-1];
        var next = '/'+ev.toString() + '/' + type.steps[(stepIndex+1) % type.steps.length];
        switch (id) {
            case 1:
                return <Step1 t1={this.state.types[ev-1].name} t2={this.state.steps[id-1]} 
                              back='/' prev={prev} 
                                       next={next}>
                            <button type="button" className="btn btn-default">{this.state.btns[id-1]}</button>
                       </Step1>;
            case 2:
                return <Step2 t1={this.state.types[ev-1].name} t2={this.state.steps[id-1]} 
                              back='/' prev={prev} 
                                       next={next}>
                            <button type="button" className="btn btn-default">{this.state.btns[id-1]}</button>
                       </Step2>;
            case 3:
                return <Step3 t1={this.state.types[ev-1].name} t2={this.state.steps[id-1]} 
                              back='/' prev={prev} 
                                       next={next}>
                            <button type="button" className="btn btn-default">{this.state.btns[id-1]}</button>
                       </Step3>;
            case 4:
                return <Step4 t1={this.state.types[ev-1].name} t2={this.state.steps[id-1]} 
                              back='/' prev={prev} 
                                       next={next}>
                            <button type="button" className="btn btn-default">{this.state.btns[id-1]}</button>
                       </Step4>;
            case 5:
                return <Step5 t1={this.state.types[ev-1].name} t2={this.state.steps[id-1]} 
                              back='/' prev={prev} 
                                       next={next}>
                            <button type="button" className="btn btn-default">{this.state.btns[id-1]}</button>
                       </Step5>;
            default:
                console.log(ev + '/' + id);
        }
    }
}