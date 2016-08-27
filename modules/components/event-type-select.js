import React from 'react';
import Modal from 'react-modal';

export default class EventTypeSelect extends React.Component {
    constructor(props) {
        super(props);

        this.modalStyle = {
            overlay: {
                position: 'fixed',
                top: 150,
                left: 0,
                right: 0,
                bottom: 150,
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
            },
            content: {
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                bottom: '20px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.5)',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                outline: 'none',
                padding: '0px'
            }
        };

        if(props.userType.indexOf('storeid:') >= 0){
            this.eventTypes = [
                '廣告事件'
            ];
        } else 
            this.eventTypes = [
                '廣告事件','定位事件','客製化事件'
            ];

        this.state = {
            isModalOpen: this.props.isOpen
        }
    }

    selectType(typeName){
        if(this.props.onChange){
            this.props.onChange(typeName);
        }
    }

    componentWillReceiveProps(nextProps){
        this.setState({isModalOpen:nextProps.isOpen});
    }

    render() {
        let m = this;

        return <Modal isOpen={this.state.isModalOpen} style={this.modalStyle} overlayClassName="modal-overlay">
            <span className="text-center">
                <h3>請選擇欲新增事件類型</h3>
            </span>
            <br/>
            {
                this.eventTypes.map(function(typeName){
                    return <div className='overlay-option' onClick={m.selectType.bind(m,typeName)}>{typeName}</div>
                })
            }
        </Modal>;
    }
}