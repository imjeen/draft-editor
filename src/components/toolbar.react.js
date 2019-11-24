
import React, {Component, PropTypes, defaultProps} from 'react';
import {EditorState, RichUtils} from 'draft-js';

import TitleButton from './buttons/titleButton';
import LinkButton from './buttons/linkButton';
import MediaButton from './buttons/mediaButton';
import InsertButton from './buttons/insertButton';
import InlineGroup from './buttons/inlineGroup';
import BlockGroup from './buttons/blockGroup';
import AlignButton from './buttons/alignButton';
import ColorButton from './buttons/colorButton';
import FontSizeButton from './buttons/fontSizeButton';
import LineButton from './buttons/lineButton';

import SVG from '../svg';

export default class Toolbar extends Component{
    
    constructor(props){
        super(props);
        this.onUndo = ()=> this.props.onChange(EditorState.undo(this.props.editorState));
        this.onRedo = ()=> this.props.onChange(EditorState.redo(this.props.editorState));

        this.toggleBlockType = (blockType)=> this.props.onChange( RichUtils.toggleBlockType(this.props.editorState, blockType) );
        this.toggleInlineStyle = (inlineStyle)=> this.props.onChange( RichUtils.toggleInlineStyle(this.props.editorState, inlineStyle) );

    }
    
    render(){
        const {editorState, onChange, focusEditor, isHideModal} = this.props;
        let canUndo = editorState.getUndoStack().size !== 0;
        let canRedo = editorState.getRedoStack().size !== 0;

        return (<div className="draftEditor-toolbar"
                     onClick={focusEditor}>
            
            <TitleButton
                editorState={editorState}
                onToggle={this.toggleBlockType}
                svg={SVG.header}
                isHideModal={isHideModal}
            />

            <ColorButton
                editorState={editorState}
                onChange={onChange}
                svg={SVG.color}
                isHideModal={isHideModal}
            />

            <FontSizeButton
                editorState={editorState}
                onChange={onChange}
                svg={SVG.size}
                isHideModal={isHideModal}
            />

            <InlineGroup
                editorState={editorState}
                buttons={INLINE_BUTTONS}
                onToggle={this.toggleInlineStyle}
            />

            <LineButton
                editorState={editorState}
                onChange={onChange}
                type={ATOMIC_TYPES_MAP["line"]}
                svg={SVG.line}
            />

            <BlockGroup
                editorState={editorState}
                buttons={BLOCK_BUTTONS}
                onToggle={this.toggleBlockType}
            />

            <LinkButton
                editorState={editorState}
                onChange={onChange}
                focusEditor={focusEditor}
                type="link"
                svg={SVG.link}
                isHideModal={isHideModal}
            />

            <LinkButton
                editorState={editorState}
                onChange={onChange}
                type="unlink"
                svg={SVG.unlink}
            />
            
            <MediaButton
                editorState={editorState}
                type={ATOMIC_TYPES_MAP["image"]}
                onChange={onChange}
                svg={SVG.image}
                isHideModal={isHideModal}
            />

            <MediaButton
                editorState={editorState}
                type={ATOMIC_TYPES_MAP["video"]}
                onChange={onChange}
                svg={SVG.video}
                isHideModal={isHideModal}
            />
            
            <InsertButton
                editorState={editorState}
                onChange={onChange}
                type={ATOMIC_TYPES_MAP["insert"]}
                onAddInsert={this.onAddInsert}
                svg={SVG.add}
                isHideModal={isHideModal}
            />

            <AlignButton
                editorState={editorState}
                onChange={this.props.onChange}
                align="left"
                svg={SVG.left}
            />

            <AlignButton
                editorState={editorState}
                onChange={this.props.onChange}
                align="center"
                svg={SVG.center}
            />

            <AlignButton
                editorState={editorState}
                onChange={this.props.onChange}
                align="right"
                svg={SVG.right}
            />

            <div className="draftEditor-styleCtrls">
                <a className={`draftEditor-styleButton${ canUndo?"":" disabled"}`}
                   title="Undo(ctrl/cmd + z)"
                   tabIndex="-1"
                   unselectable="on"
                   onMouseDown={()=> canUndo && this.onUndo()}
                   href="javascript:void(0);">
                    <svg className="styleButton-svg"><use xlinkHref={SVG.undo}></use></svg>
                </a>
            </div>

            <div className="draftEditor-styleCtrls">
                <a className={`draftEditor-styleButton${ canRedo? "": " disabled"}`}
                   title="Redo(ctrl/cmd + shift + z)"
                   tabIndex="-1"
                   unselectable="on"
                   onMouseDown={()=> canRedo && this.onRedo()}
                   href="javascript:void(0);">
                    <svg className="styleButton-svg"><use xlinkHref={SVG.redo}></use></svg>
                </a>
            </div>

        </div>);
    }
}

Toolbar.propTypes = {
    editorState: PropTypes.object,
    onChange: PropTypes.func,
    focusEditor: PropTypes.func,
};

//==============================================

export const ATOMIC_TYPES_MAP = {
    image: 'atomic:image',
    video: 'atomic:video',
    audio: 'atomic:audio',
    insert: 'atomic:insert',
    line:  'atomic:line',
}

//==============================================

export const BLOCK_BUTTONS = [
    {
        label: 'Q',
        style: 'blockquote',
        svg: SVG.blockquote,
        description: 'Blockquote',
    },
    {
        label: 'UL',
        style: 'unordered-list-item',
        svg: SVG.unorderlist,
        description: 'Unordered List',
    },
    {
        label: 'OL',
        style: 'ordered-list-item',
        svg: SVG.orderlist,
        description: 'Ordered List',
    },
];

// --------------------------------------------

export const INLINE_BUTTONS = [
    {
        label: 'B',
        style: 'BOLD',
        svg: SVG.bold,
        description: 'Bold (cmd/ctrl + B)',
    },
    {
        label: 'I',
        style: 'ITALIC',
        svg: SVG.itablic,
        description: 'Italic',
    },
    {
        label: 'U',
        style: 'UNDERLINE',
        svg: SVG.underline,
        description: 'Underline',
    },
    {
        label: 'S',
        style: 'STRIKETHROUGH',
        svg: SVG.strikethrough,
        description: 'Strikethrough',
    },
    {
        label: 'Code',
        style: 'CODE',
        svg: SVG.code,
        description: 'Inline Code',
    },
];



