
import React, {Component, PropTypes} from 'react';
import {EditorState, Modifier, RichUtils} from 'draft-js';
import { COLORS } from '../../constant';
import {customInlineStyleMapGroup} from '../../assist/inlineStyleMap';

const COLOR_GROUP = customInlineStyleMapGroup.color;

class ColorButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
        };
        this.toggleDropdown = this._toggleDropDown.bind(this);
        this.toggleColor = this._onToggleColor.bind(this);

    }

    _toggleDropDown(event){
        event.preventDefault();
        this.setState({isOpen: !this.state.isOpen},()=>{
            //
        });
    }

    _onToggleColor(styleType, event){
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
        
        const nextContentState = Object.keys(COLOR_GROUP).reduce( (prev,cur)=>{
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
               title="font color"
               href="javascript:void(0);">
                <svg className="styleButton-svg"><use xlinkHref={this.props.svg}></use></svg>
            </a>
            <div className="draftEditor-dropdown draftEditor-color-wrap" style={{display: this.state.isOpen? "block": "none"}}>
                {COLORS.map((color, index)=>{
                    let style = `color-${color}`;
                    return (<strong
                       key={index}
                       className={"color-option" + (currentStyle.has(style)?" color-option-active":"")}
                       onMouseDown={(e)=>{this.toggleColor(style, e)}}>
                       <span className="color-option-item" style={{backgroundColor: color}}></span>
                    </strong>);
                })}
            </div>
        </div>);
    }

}

ColorButton.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    svg: PropTypes.string,
    isHideModal: PropTypes.bool,
};

export default ColorButton;

