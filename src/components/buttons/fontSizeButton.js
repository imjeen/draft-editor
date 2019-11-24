
import React, {Component, PropTypes} from 'react';
import {EditorState, Modifier, RichUtils} from 'draft-js';
import { FONTSIZES } from '../../constant';
import {customInlineStyleMapGroup} from '../../assist/inlineStyleMap';

const FONTSIZE_GROUP = customInlineStyleMapGroup.fontSize;

class FontSizeButton extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
        };
        this.toggleDropdown = this._toggleDropDown.bind(this);
        this.toggleFontSize = this._toggleFontSize.bind(this);
    }

    _toggleDropDown(event){
        event.preventDefault();
        this.setState({isOpen: !this.state.isOpen},()=>{
            //
        });
    }

    _toggleFontSize(styleType, event){
        event.preventDefault();
        this.setState({
            isOpen: false,
        },()=>{
            this._toggleInlineStyle(styleType);
        })
    }

    _toggleInlineStyle(styleType){
        const {editorState, onChange} = this.props;
        const selection = editorState.getSelection();

        const nextContentState = Object.keys(FONTSIZE_GROUP).reduce( (prev,cur)=>{
            return Modifier.removeInlineStyle(prev, selection, cur)
        }, editorState.getCurrentContent());

        let nextEditorState = EditorState.push(editorState, nextContentState, "change-inline-style");

        const currentStyle = editorState.getCurrentInlineStyle();

        if(selection.isCollapsed()){
            nextEditorState = currentStyle.reduce((prev, cur)=>{
                return RichUtils.toggleInlineStyle(prev, cur)
            },nextEditorState)
        }

        if(!currentStyle.has(styleType)){
            nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, styleType);
        }

        onChange(nextEditorState);

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isHideModal && this.state.isOpen){
            this.setState({isOpen: false});
        }
    }
    
    render(){
        let className = `draftEditor-styleButton draftEditor-dropdown-title${this.state.isOpen ? ' on':''}`;
        let currentStyle = this.props.editorState.getCurrentInlineStyle();

        return (<div className="draftEditor-styleCtrls draftEditor-dropdown-wrap">
            <a className={className}
               onMouseDown={this.toggleDropdown}
               tabIndex="-1"
               unselectable="on"
               title="font size"
               href="javascript:void(0);">
                <svg className="styleButton-svg"><use xlinkHref={this.props.svg}></use></svg>
            </a>
            <div className="draftEditor-dropdown draftEditor-fontsize-wrap" style={{display: this.state.isOpen? "block": "none"}}>
                {FONTSIZES.map((size, index)=>{
                    let style = `fontSize-${size}`;
                    return (<div
                        key={index}
                        className={"size-option" + (currentStyle.has(style)?" size-option-active":"")}
                        onMouseDown={(e)=>{this.toggleFontSize(style, e)}}>
                        {size}
                    </div>);
                })}
            </div>
        </div>);
    }
    
}

FontSizeButton.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    svg: PropTypes.string,
    isHideModal: PropTypes.bool,
};

export default FontSizeButton;
