import React from 'react';
import Modal from 'react-modal';
import BeaconList from './beacon-list';

export default class BeaconListBox extends React.Component {
    constructor(props) {
        super(props);

        this.modalStyle = {
            overlay: {
                position: 'fixed',
                top: 50,
                left: 0,
                right: 0,
                bottom: 50,
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

        this.state = {
            isModalOpen: this.props.isOpen
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isModalOpen: nextProps.isOpen });
    }

    closeBox() {
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        let m = this;

        return <Modal isOpen={this.state.isModalOpen} style={this.modalStyle} overlayClassName="modal-overlay">
            <div onClick={this.closeBox.bind(this)} className="fit-block">
                <span className="text-center">
                    <h3>事件掛載於Beacons/群組</h3>
                </span>
                <br/>
                <BeaconList event={this.props.event} />
            </div>
        </Modal>;
    }
}