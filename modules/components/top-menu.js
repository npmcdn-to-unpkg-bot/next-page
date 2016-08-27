import React from 'react';
import Modal from 'react-modal';

export default class TopMenu extends React.Component {
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

        let menuItems = [
                '場域選擇','登出'
            ]; 

        if(props.userType.indexOf('storeid:') >= 0 || props.userType.indexOf('org:') >= 0){
            menuItems = [
                '登出'
            ];
        } 

        this.state = {
            isModalOpen: this.props.isOpen,
            menuItems: menuItems
        }
    }

    selectCommand(command){
        if(this.props.onChange){
            this.props.onChange(command);
        }
    }

    componentWillReceiveProps(nextProps){
        let userType = nextProps.userType;

        let menuItems = [
                '場域選擇','登出'
            ]; 

        if(userType.indexOf('storeid:') >= 0 || userType.indexOf('org:') >= 0){
            menuItems = [
                '登出'
            ];
        }         

        this.setState({isModalOpen:nextProps.isOpen, menuItems:menuItems});
    }

    render() {
        let m = this;

        return <Modal isOpen={this.state.isModalOpen} style={this.modalStyle} overlayClassName="modal-overlay">
            <span className="text-center">
                <h3>請選擇功能</h3>
            </span>
            <br/>
            {
                this.state.menuItems.map(function(command){
                    return <div className='overlay-option' onClick={m.selectCommand.bind(m,command)}>{command}</div>
                })
            }
        </Modal>;
    }
}