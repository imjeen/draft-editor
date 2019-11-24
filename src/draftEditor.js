
import React, {Component} from 'react';
import { Editor, RichUtils, convertToRaw } from 'draft-js';

import Toolbar from './components/toolbar.react';
import customBlockRendererFn from './components/blockRendererFn';

import createEditorState from './assist/createEditorState';
import blockRenderMap from './assist/blockRenderMap';
import blockStyleFn from './assist/blockStyleFn';
import inlineStyleMap from './assist/inlineStyleMap';
import getHtmlFromDraft from './assist/getHtmlFromDraft';

import {data} from './data/content_id_610';

import 'draft-js/dist/Draft.css';

import exportStyle from '!!css-to-string-loader!css-loader!sass-loader!../static/sass/export.scss';

export default class DraftEditor extends Component {

    constructor(props){
        super(props);
    
        this.state = {
            editorState: createEditorState(data),
            editorEnabled: true,
            editorFocused: false,
            editorMouseDown: false,
            toolbarMouseDown: false,
        };

        this.onFocus = ()=> this.refs.editor.focus();
        this.onTab = (event)=> this.onChange( RichUtils.onTab(event, this.state.editorState, 4) );
        
        this.handleKeyCommand = this._handleKeyCommand.bind(this);

        this.onEditorMouseDown = ()=> this.setState({editorMouseDown: true});
        this.onEditorMouseUp = ()=> this.setState({editorMouseDown: false});
        this.onEditorFocus = ()=> this.setState({editorFocused: true});
        this.onEditorBlur = ()=> this.setState({editorFocused: false});

        this.onToolbarMouseDown = ()=> this.setState({toolbarMouseDown: true});
        this.onToolbarMouseUp = ()=> this.setState({toolbarMouseDown: false, editorFocused: true});

        // custom change state
        this.onChange = (editorState) => this.setState({editorState},()=>{ /*setTimeout(() => this.onFocus(), 0);*/ });
        this.getEditorState = ()=> this.state.editorState;
        this.blockRendererFn = customBlockRendererFn(this.onChange, this.getEditorState);

        //---------------------------------------------
        // test
        this.onLogState = ()=> console.log(JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()), null, 2));
        this.onToggleEdit = ()=> this.setState({editorEnabled: !this.state.editorEnabled});
        this.onDraftToHtml = ()=> console.log(getHtmlFromDraft(this.state.editorState));
        this.onPreview = this._onPreview.bind(this);

    }

    _handleKeyCommand(command){
        const {editorState} = this.state;
        const newEditorState = RichUtils.handleKeyCommand(editorState, command);
        if(newEditorState){
            this.onChange(newEditorState);
            return true;
        }
        return false;
    }

    _onPreview(){

        const exportScript  = function () {
            window.addEventListener('resize',function(){
                var w = window.innerWidth;
                document.documentElement.style.fontSize = (w > 750 ? 28 : (w > 320 ? 28 / 750 * w : 12)) + "px";
            },false);
        };

        const exportScriptString = `(${exportScript + ''})()`;

        const htmlString = `<meta charset="UTF-8">
                        <title>Preview</title>
                        <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                        <script type="text/javascript">${exportScriptString}</script>
                        <style>
                            html:root{
                                min-width: 320px;
                                max-width: 800px; 
                                margin: 0 auto;
                            }
                            body{
                                margin: 0;
                                padding-top: 10px;
                                box-shadow: 0 0 1px #ddd;
                            }
                        </style>
                        <style type="text/css">${exportStyle}</style>
                        ${getHtmlFromDraft(this.state.editorState)}`;

        var myWin =  window.open("","PreviewWindow",
            "toolbar=no, location=no, directories=no, status=no, menubar=no, " +
            "scrollbars=yes, resizable=yes, copyhistory=yes, " +
            "width=790, height=500 left=50 top=50");
        var doc = myWin.document;
        doc.write(htmlString);
    }

    render(){
        
        const { editorState, editorEnabled, editorFocused, toolbarMouseDown, editorMouseDown }= this.state;

        let hidePlaceholder = ' ';
        let contentState = editorState.getCurrentContent();
        if(contentState.hasText() === false){
            if(contentState.getBlockMap().first().getType() !== 'unstyled'){
                hidePlaceholder='hidePlaceholder';
            }
        }
        
        const hasFocus = editorFocused || toolbarMouseDown || editorMouseDown;

        return (<div className="draftEditor-wrapper">
            <div onMouseDown={this.onToolbarMouseDown}
                 onMouseUp={this.onToolbarMouseUp}>
                <Toolbar
                    editorState={editorState}
                    onChange={this.onChange}
                    focusEditor={this.onFocus}
                    editorFocused={editorFocused}
                    isHideModal={editorMouseDown || !hasFocus}
                />
            </div>
            <div className={"draftEditor-editor " + hidePlaceholder}
                 onClick={this.onFocus}
                 onMouseDown={this.onEditorMouseDown}
                 onMouseUp={this.onEditorMouseUp}
                 onFocus={this.onEditorFocus}
                 onBlur={this.onEditorBlur}
                 style={{cursor: editorEnabled?"text":"default"}}>
                <Editor
                    editorState={editorState}
                    onChange={this.onChange}
                    onTab={this.onTab}
                    blockRendererFn={this.blockRendererFn}
                    blockRenderMap={blockRenderMap}
                    blockStyleFn={blockStyleFn}
                    customStyleMap={inlineStyleMap}
                    handleKeyCommand={this.handleKeyCommand}
                    placeholder="Write something..."
                    ref="editor"
                    readOnly={!editorEnabled}
                    spellCheck={true}
                />
            </div>
            <div className="draftEditor-button-group group-center">
                <button onMouseUp={this.onLogState} className="draftEditor-button default-button">{"Log State"}</button>
                <button onMouseUp={this.onDraftToHtml} className="draftEditor-button default-button">{"log html"}</button>
                <button onMouseUp={this.onPreview} className="draftEditor-button success-button">{"Preview"}</button>
                <button onMouseUp={this.onToggleEdit} className="draftEditor-button default-button">{`Toggle Edit(editorEnabled: ${editorEnabled})`}</button>
            </div>

        </div>);
    }

}
