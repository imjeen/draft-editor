
import React, {Component, PropTypes} from 'react';

export default class StyleButton extends Component {
    constructor(props){
        super(props);
        this.onToggle = (e)=>{
            e.preventDefault();
            this.props.onToggle(this.props.style);
        }
    }
    render(){
        let className = 'draftEditor-styleButton';
        this.props.isActive && (className += ' draftEditor-styleButton--active');

        return (<a className={className}
                   onMouseDown={this.onToggle}
                   title={this.props.description}
                   tabIndex="-1" unselectable="on"
                   href="javascript:void(0);">
            <svg className="styleButton-svg"><use xlinkHref={this.props.svg}></use></svg>
        </a>);
    }
}

StyleButton.propTypes = {
    style: PropTypes.string,
    isActive: PropTypes.bool,
    label: PropTypes.string,
    onToggle: PropTypes.func,
};
