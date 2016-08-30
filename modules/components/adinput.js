import React from 'react';
import ChromePicker from 'react-color';
import Modal from 'react-modal';
import dummyImg from '../../images/addummy.jpg';
import paintImg from '../../images/paint.png';

class ColorPicker extends React.Component {
    constructor(props) {
        super(props);

        this.modalStyle = {
            overlay: {
                position: 'fixed',
                top: 100,
                left: 50,
                right: 50,
                bottom: 100,
                backgroundColor: 'rgba(255, 255, 255, 0.5)'
            },
            content: {
                position: 'absolute',
                top: '20px',
                left: '20px',
                right: '20px',
                bottom: '20px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0)',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                outline: 'none',
                padding: '0px',
            }
        };
    }

    handleColor(name, color) {
        if (this.props.onChange) {
            this.props.onChange({
                name: name,
                color: color.hex
            })
        }
    }

    closeBox() {
        console.log('close box');
        if (this.props.onClose) {
            this.props.onClose();
        }
    }

    render() {
        return <Modal ref="modal" isOpen={this.props.isColorOpen} style={this.modalStyle} onRequestClose={this.closeBox.bind(this)}
            shouldCloseOnOverlayClick={true}>
            <div className="col-sm-offset-2 col-sm-2 color-picker">
                <ChromePicker ref="titlecolor" onChange={this.handleColor.bind(this, 'title') } color={this.props.titleColor} />
            </div>
            <div className="col-sm-2" />
            <div className="col-sm-2 color-picker">
                <ChromePicker ref="bgcolor" onChange={this.handleColor.bind(this, 'bg') } color={this.props.titleBackgroundColor} />
            </div>
        </Modal>;
    }
}

export default class AdInputBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: props.imgUrl || '',
            bgUrl: props.bgUrl || '',
            isColorOpen: false,
            titleColor:props.titleColor || '',
            titleBackgroundColor:props.titleBackgroundColor || ''
        }
    }

    componentWillReceiveProps(nextProps){      
        this.setState({
            imgUrl:nextProps.imgUrl || '',
            bgUrl:nextProps.bgUrl || '',
            titleColor:nextProps.titleColor || '',
            titleBackgroundColor:nextProps.titleBackgroundColor || ''
        })
    }

    componentDidMount(){
        let url=this.state.bgUrl;
        if(url && this.refs.adcontent)
            this.refs.adcontent.style.backgroundImage = "url('" + url + "')";

        if(this.state.titleColor)
            this.refs.title.style.color = this.state.titleColor;

        if(this.state.titleBackgroundColor)
            this.refs.title.style.backgroundColor = this.state.titleBackgroundColor;                    
    }

    setColor(colorInfo) {
        if (colorInfo.name == 'title') {
            this.refs.title.style.color = colorInfo.color;
            this.setState({titleColor:colorInfo.color});
        } else if (colorInfo.name == 'bg') {
            this.refs.title.style.backgroundColor = colorInfo.color;
            this.setState({titleBackgroundColor:colorInfo.color});
        }
    }

    setImage(e) {
        let url = e.target.value;
        this.setState({ imgUrl: url });
    }

    setBackground(e) {
        let url = e.target.value;
        this.refs.adcontent.style.backgroundImage = "url('" + url + "')";
        this.setState({ bgUrl: url });
    }

    openColorPicker() {
        this.setState({ isColorOpen: !this.state.isColorOpen });
    }

    getAdValues(){
        return {
            Title:this.refs.title.value,
            Text1:this.refs.subtitle.value,
            Text2:this.refs.content.value,
            TitleColor:this.state.titleColor,
            TitleBackgroundColor:this.state.titleBackgroundColor,
            imgUrl: this.state.imgUrl,
            bgUrl: this.state.bgUrl
        }
    }

    render() {
        return <div className="full-width">
            <ColorPicker ref="color" titleColor={this.state.titleColor} titleBackgroundColor={this.state.titleBackgroundColor} 
                isColorOpen={this.state.isColorOpen} onChange={this.setColor.bind(this) } onClose={this.openColorPicker.bind(this) } />
            <div className="ad-container text-left">
                <div ref="adcontent" className="ad-content">
                    <div className="ad-title-box">
                        <input ref="title" type="text" className="ad-title form-control" placeholder="請輸入廣告標題" defaultValue={this.props.title} />
                        <span className="ad-title-button">
                            <img src={paintImg} className="full-width" onClick={this.openColorPicker.bind(this) } />
                        </span>
                    </div>
                    <div className="ad-content-box">
                        <span className="ad-left">
                            <input type="text" ref="subtitle" className="ad-subtitle form-control" placeholder="請輸入廣告副標" defaultValue={this.props.subtitle} />
                            <textarea ref="content" rows="7" className="ad-text form-control" placeholder="請輸入廣告訊息文字" defaultValue={this.props.content} />
                        </span>
                        <img src={this.state.imgUrl || dummyImg} className="ad-image" />
                    </div>
                </div>
            </div>
            <div className="">
                卡片圖案 <input type="url" className="form-control ad-url" placeholder="請輸入卡片圖案Url" onChange={this.setImage.bind(this) } defaultValue={this.props.imgUrl} />
                卡片背景 <input type="url" className="form-control ad-url" placeholder="請輸入卡片背景Url" onChange={this.setBackground.bind(this)} defaultValue={this.props.bgUrl} />
            </div>
        </div>;
    }
}