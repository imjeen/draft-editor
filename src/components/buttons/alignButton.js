
import React, {Component, PropTypes} from 'react';
import setBlockData from '../../modifiers/setBlockData';

export default class AlginButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
        };

        this.onSetAlign = this._onSetAlign.bind(this);

    }

    _onSetAlign(event){
        event.preventDefault();
        const newEditorState = setBlockData(this.props.editorState, {'text-align': this.props.align});
        this.props.onChange(newEditorState);
    }


    render(){

        return (<div className="draftEditor-styleCtrls">
            <a className="draftEditor-styleButton"
               onMouseDown={this.onSetAlign}
               tabIndex="-1"
               unselectable="on"
               title={`align ${this.props.align}`}
               href="javascript:void(0);">
                <svg className="styleButton-svg"><use xlinkHref={this.props.svg}></use></svg>
            </a>
        </div>);
    }

}


AlginButton.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    align: PropTypes.string,
    svg: PropTypes.string,
};
