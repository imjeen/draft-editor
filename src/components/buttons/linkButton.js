
import React, {Component, PropTypes} from 'react';
import {Entity, RichUtils} from 'draft-js';

export default class LinkButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            url: '',
            isOpen: false,
        };
        this.toggleDropdown = this._toggleDropDown.bind(this);
        this.onInputChange = (event)=> this.setState({url: event.target.value});
        this.onInputKeyDown = (event)=> event.which === 13 && this._onSetLink(event);
        this.onClose = this._onClose.bind(this);

        this.onSetLink = this._onSetLink.bind(this);
        this.onRemoveLink = this._onRemoveLink.bind(this);
        
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

    _onSetLink(event){
        event.preventDefault();
        event.stopPropagation();
        const {editorState, onChange, focusEditor} = this.props;
        const {url} = this.state;

        if(url.trim() === ''){
            alert('Type a valid URL please!');
            return;
        }

        const entityKey = Entity.create('LINK', 'MUTABLE', { href: url});
        const newEditorState = RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey);
        onChange(newEditorState);
        setTimeout(()=>focusEditor(), 0);

        this.setState({
            url: '',
            isOpen: false,
        });
    }

    _onRemoveLink(event){
        event.preventDefault();

        const {editorState, onChange} = this.props;
        const selection = editorState.getSelection();
        if(!selection.isCollapsed()){
            onChange(RichUtils.toggleLink(editorState, selection, null));
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isHideModal && this.state.isOpen){
            this.setState({isOpen: false});
        }
    }

    render(){
        const {editorState, type, svg} = this.props;

        if(type === 'unlink'){
            return (<div className="draftEditor-styleCtrls">
                    <a className="draftEditor-styleButton"
                       onMouseDown={this.onRemoveLink}
                       title={type.description}
                       tabIndex="-1"
                       unselectable="on"
                       title="remove link"
                       href="javascript:void(0);">
                        <svg className="styleButton-svg"><use xlinkHref={this.props.svg}></use></svg>
                    </a>
            </div>);
        }

        let currentStyle = editorState.getCurrentInlineStyle();
        let _className = `draftEditor-styleButton draftEditor-dropdown-title${this.state.isOpen ? ' on':''}`;
        currentStyle.has('LINK') && (_className += ' draftEditor-styleButton--active');

        return (<div className="draftEditor-styleCtrls draftEditor-dropdown-wrap"
            onClick={(event)=>event.stopPropagation()}>
            { LINK_BUTTON.map((type)=>
                <a className={_className}
                   onMouseDown={this.toggleDropdown}
                   title={type.description}
                   tabIndex="-1"
                   unselectable="on"
                   title="link"
                   href="javascript:void(0);">
                    <svg className="styleButton-svg"><use xlinkHref={svg}></use></svg>
                </a>
            )}
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
                    <button className="draftEditor-button success-button" onMouseDown={this.onSetLink}>OK</button>
                </div>
            </div>
        </div>);
    }

}


LinkButton.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    focusEditor: PropTypes.func,
    svg: PropTypes.string,
    type: PropTypes.string,
    isHideModal: PropTypes.bool,
};


const LINK_BUTTON = [
    {
        label: 'Link',
        style: 'LINK',
        description: 'link',
    }
];