
import React, {Component, PropTypes} from 'react';
import addBlock from '../../modifiers/addBlock';

export default class LineButton extends Component {

    constructor(props){
        super(props);
        this.onAddLine = this._onAddLine.bind(this);
    }

    _onAddLine(event){
        event.preventDefault();
        const {editorState, type, onChange} = this.props;
        const newEditorState = addBlock(editorState, {}, type);
        onChange(newEditorState);
    }

    render(){
        const {svg} = this.props;

        return (<div className="draftEditor-styleCtrls">
            <a className="draftEditor-styleButton"
               title="horizone line"
               tabIndex="-1"
               unselectable="on"
               onMouseDown={this.onAddLine}
               href="javascript:void(0);">
                <svg className="styleButton-svg"><use xlinkHref={svg}></use></svg>
            </a>
        </div>);
        
    }

}


LineButton.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    svg: PropTypes.string,
    type: PropTypes.string,
};
