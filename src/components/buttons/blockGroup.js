
import React, {Component, PropTypes} from 'react';
// import {RichUtils} from 'draft-js';

import StyleButton from './_styleButton';

const BlockGroup = (props)=>{

    if (props.buttons.length < 1) {
        return null;
    }

    let {buttons, editorState, focusEditor, onToggle} = props;
    
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();


    return (<div className="draftEditor-styleCtrls">
        {buttons.map((type)=>
            <StyleButton
                isActive={type.style === blockType}
                key={type.label}
                label={type.label}
                description={type.description}
                svg={type.svg}
                style={type.style}
                onToggle={onToggle}
            />
        )}
    </div>);
};

BlockGroup.propTypes = {
    editorState: PropTypes.object.isRequired,
    buttons: PropTypes.Array,
    onToggle: PropTypes.func,
    focusEditor: PropTypes.func,
};

export default BlockGroup;
