
import React, {Component, PropTypes} from 'react';
import StyleButton from './_styleButton';

const InlineGroup = (props)=>{
    
    if (props.buttons.length < 1) {
        return null;
    }

    // const {editorState} = props;
    let currentStyle = props.editorState.getCurrentInlineStyle();

    return(<div className="draftEditor-styleCtrls">
        {props.buttons.map((type)=>
            <StyleButton
                style={type.style}
                label={type.label}
                svg={type.svg}
                description={type.description}
                isActive={currentStyle.has(type.style)}

                key={type.label}
                onToggle={props.onToggle}
            />
        )}
    </div>);
};

InlineGroup.propTypes = {
    editorState: PropTypes.object.isRequired,
    buttons: PropTypes.Array,
    onToggle: PropTypes.func,
};

export default InlineGroup;
