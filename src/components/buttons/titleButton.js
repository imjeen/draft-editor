
import React, {Component, PropTypes} from 'react';

export default class TitleButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            // curStyleLabel: 'H',
            isOpen: false,
        };
        this.toggleDropdown = (event) => {
            event.preventDefault();
            this._toggleDropDown();
        };
        this.onToggle = (style, event) => {
            event.preventDefault();
            this.props.onToggle(style);
            this._toggleDropDown();
        };
    }

    _toggleDropDown(){
        this.setState({isOpen: !this.state.isOpen});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isHideModal && this.state.isOpen){
            this.setState({isOpen: false});
        }
    }

    render(){

        let {editorState} = this.props;

        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();

        let className = `draftEditor-styleButton draftEditor-dropdown-title${this.state.isOpen ? ' on':''}`;

        return (<div className="draftEditor-styleCtrls draftEditor-dropdown-wrap">
            <a className={className}
               title="Title"
               tabIndex="-1"
               unselectable="on"
               title="head title"
               onMouseDown={this.toggleDropdown}
               href="javascript:void(0);">
                <svg className="styleButton-svg"><use xlinkHref={this.props.svg}></use></svg>
            </a>
            <div className="draftEditor-dropdown draftEditor-title-wrap" style={{display: this.state.isOpen? "block": "none"}}>
                {TITLE_BUTTONS.map( (type)=>{

                    let className = 'title-option';
                    if(blockType === type.style){
                        className += ' title-option-active';
                    }

                    return (<a className={className}
                           key={type.label}
                           onMouseDown={ (e)=> this.onToggle.apply(this, [type.style, e])}
                           title={type.description}
                           tabIndex="-1"
                           unselectable="on"
                           href="javascript:void(0);">
                        {type.description}
                        </a>);
                    }
                )}
            </div>
        </div>);
    }
}

TitleButton.propTypes = {
    editorState: PropTypes.object,
    onToggle: PropTypes.func,
    svg: PropTypes.string,
    isHideModal: PropTypes.bool,
};

/*Title.defaultProps = {

};*/



//---------------------------------------

const TITLE_BUTTONS = [
    {
        label: 'H',
        style: 'unstyled',
        description: 'Title',
    },
    {
        label: 'H1',
        style: 'header-one',
        description: 'Title H1',
    },
    {
        label: 'H2',
        style: 'header-two',
        description: 'Title H2',
    },
    {
        label: 'H3',
        style: 'header-three',
        description: 'Title H3',
    },
    {
        label: 'H4',
        style: 'header-four',
        description: 'Title H4',
    },
    {
        label: 'H5',
        style: 'header-five',
        description: 'Title H5',
    },
];

