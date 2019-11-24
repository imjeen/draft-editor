
import React, {Component, PropTypes} from 'react';
import {Entity, AtomicBlockUtils} from 'draft-js';

export default class MediaButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            url: '',
            isOpen: false,
        };
        this.toggleDropdown = this._toggleDropDown.bind(this);
        this.onInputChange = (event)=> this.setState({url: event.target.value});
        this.onInputKeyDown = (event)=> event.which === 13 && this._onAddMedia(event);
        this.onClose = this._onClose.bind(this);
        this.onAddMedia = this._onAddMedia.bind(this);

    }

    _toggleDropDown(event){
        event.preventDefault();
        this.setState({isOpen: !this.state.isOpen},()=>{
            this.state.isOpen && setTimeout(()=> this.refs.url.focus(), 0);
        });
    }

    _onClose(event){
        event.preventDefault();
        this.setState({isOpen: false})
    }

    _onAddMedia(event){
        event.preventDefault();
        const {editorState, type, onChange} = this.props;
        const {url} = this.state;
        if(url.trim() === ''){
            alert('Type a valid URL please!');
            return;
        }

        const entityKey = Entity.create(type, 'MUTABLE', { src: url });
        const newEditorState = AtomicBlockUtils.insertAtomicBlock( editorState, entityKey, ' ');
        onChange(newEditorState);

        this.setState({
            url: '',
            isOpen: false,
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isHideModal && this.state.isOpen){
            this.setState({isOpen: false});
        }
    }

    render() {

        let className = `draftEditor-styleButton draftEditor-dropdown-title${this.state.isOpen ? ' on' : ''}`;

        return (<div className="draftEditor-styleCtrls draftEditor-dropdown-wrap"
                     onClick={(event)=>event.stopPropagation()}>
            <a className={className}
               onMouseDown={this.toggleDropdown}
               tabIndex="-1"
               unselectable="on"
               title={this.props.type.replace('atomic:','')}
               href="javascript:void(0);">
                <svg className="styleButton-svg">
                    <use xlinkHref={this.props.svg}></use>
                </svg>
            </a>
            <div className="draftEditor-dropdown" style={{display: this.state.isOpen? "block": "none"}}>
                <div className="draftEditor-input-wrap">
                    <input type="text"
                       placeholder="Enter a valid URL or others."
                       ref="url"
                       value={this.state.url}
                       onChange={this.onInputChange}
                       onKeyDown={this.onInputKeyDown}
                    />
                </div>
                <div className="draftEditor-button-group group-right">
                    <button className="draftEditor-button default-button" onMouseDown={this.onClose}>Cancel</button>
                    <button className="draftEditor-button success-button" onMouseDown={this.onAddMedia}>OK</button>
                </div>
            </div>
        </div>);
    }

}

MediaButton.propTypes = {
    editorState: PropTypes.object.isRequired,
    type: PropTypes.string,
    onChange: PropTypes.func,
    svg: PropTypes.string,
    isHideModal: PropTypes.bool,
};