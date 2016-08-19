import React from 'react';
import StepSelector from './step-selector';
import { hashHistory } from 'react-router';
import { Step1, Step2, Step3, Step4, Step5 } from './add-step';
import store from './store';

export default class StepContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: this.props.params.ev,
            stepId: this.props.params.id
        }

        this.types = [{ ev: 1, name: '一般設定', alias: 'std', steps: ['1', '2', '3', '4', '5'] },
            { ev: 2, name: '廣告設定', alias: 'adv', steps: ['1', '2', '3', '4', '5'] },
            { ev: 3, name: '定位設定', alias: 'loc', steps: ['1', '2', '3', '4', '5'] },
            { ev: 4, name: '客製化設定', alias: 'cus', steps: ['1', '2', '3', '4', '5'] }];
        this.steps = ['設定事件', '設定負責群組/Beacon', '設定執行日期與時間', '確認設定與發佈', '發佈成功'];

        this.eventHandler = this.handleEvent.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        let ev = nextProps.params.ev;
        let id = nextProps.params.id;

        this.setState({ eventId: ev, stepId: id });
    }

    componentDidMount() {
        store.addListener('EVENT_ADDED', this.eventHandler);
        store.addListener('EVENT_UPDATED', this.eventHandler);
    }

    componentWillUnmount() {
        store.removeListener('EVENT_ADDED', this.eventHandler);
        store.removeListener('EVENT_UPDATED', this.eventHandler);
    }

    handleEvent(res) {
        hashHistory.push('/list');
    }

    switchStep(stepId) {
        let currentStep = this.refs['step' + this.state.stepId];

        if(!currentStep.isValid()) return;

        if (currentStep && currentStep.saveEventData) {
            currentStep.saveEventData();
        }

        this.setState({ stepId: stepId });
    }

    nextStep() {
        let m = this;
        let evType = this.types.find(function (t) {
            return t.ev == m.state.eventId;
        })

        if (evType) {
            let steps = evType.steps;
            var index = steps.indexOf(this.state.stepId);

            if (index >= 0) {
                var newIndex = (index + 1) % steps.length;
                var newStepId = steps[newIndex];

                this.switchStep(newStepId);
            }
        }
    }

    prevStep() {
        let m = this;
        let evType = this.types.find(function (t) {
            return t.ev == m.state.eventId;
        })

        if (evType) {
            let steps = evType.steps;
            var index = steps.indexOf(this.state.stepId);

            if (index >= 0) {
                var newIndex = (index - 1) % steps.length;
                var newStepId = steps[newIndex];

                this.switchStep(newStepId);
            }
        }
    }

    cancelStep() {
        hashHistory.push('/list');
    }

    getCurrentStep(stepId) {
        let currentStep = <Step1 ref="step1" nextStep={this.nextStep.bind(this) } prevStep={this.prevStep.bind(this) } store={store}/>;

        switch (stepId) {
            case '1':
                currentStep = <Step1 ref="step1" nextStep={this.nextStep.bind(this) } prevStep={this.prevStep.bind(this) } cancelStep={this.cancelStep.bind(this) } store={store}/>;
                break;
            case '2':
                currentStep = <Step2 ref="step2" nextStep={this.nextStep.bind(this) } prevStep={this.prevStep.bind(this) } store={store}/>;
                break;
            case '3':
                currentStep = <Step3 ref="step3" nextStep={this.nextStep.bind(this) } prevStep={this.prevStep.bind(this) } store={store}/>;
                break;
            case '4':
                currentStep = <Step4 ref="step4" nextStep={this.nextStep.bind(this) } prevStep={this.prevStep.bind(this) } publishEvent={this.publishEvent.bind(this)} store={store}/>;
                break;
            case '5':
                currentStep = <Step5 ref='step5' nextStep={this.nextStep.bind(this) } prevStep={this.prevStep.bind(this) } store={store}/>;
                break;
        }

        return currentStep;
    }

    publishEvent() {
        let project = store.getProject();

        if (project) {
            if (store.event.BeaconEventId) {
                store.updateEvent(project.LicenseKey, store.event);
            } else {
                store.addEvent(project.LicenseKey, project.ProjectId, store.event);
            }
        } else {
        }
    }

    render() {
        let currentStep = this.getCurrentStep(this.state.stepId);

        return <div className="step-container">
            <div className="step-header text-center">
                <div>Step {this.state.stepId}</div>
                <div>{this.steps[this.state.stepId]}</div>
                <StepSelector selectedStep={this.state.stepId} switchStep={this.switchStep.bind(this) } />
            </div>
            <div className="text-center">
                {
                    currentStep
                }
            </div>
        </div>;
    }
}