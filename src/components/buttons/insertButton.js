
import React, {Component, PropTypes} from 'react';
import addBlock from '../../modifiers/addBlock';

export default class InsertButton extends Component {

    constructor(props){
        super(props);
        this.state = {
            id: '',
            isOpen: false,
        };
        this.toggleDropdown = this._toggleDropDown.bind(this);
        this.onInputChange = (event)=> this.setState({id: event.target.value});
        this.onInputKeyDown = (event)=> event.which === 13 && this._onAddInsert(event);
        this.onClose = this._onClose.bind(this);
        this.onAddInsert = this._onAddInsert.bind(this);

    }

    _toggleDropDown(event){
        event.preventDefault();
        this.setState({isOpen: !this.state.isOpen},()=>{
            this.state.isOpen && setTimeout(()=> this.refs.id.focus(), 0);
        });
    }

    _onClose(event){
        event.preventDefault();
        this.setState({isOpen: false})
    }

    _onAddInsert(event){
        event.preventDefault();
        const {editorState, type, onChange} = this.props;
        const {id} = this.state;

        if(id.trim() === ''){
            alert('Type a valid URL please!');
            return;
        }

        // WARN: just for testing
        const content = {
            img: "http://7xv1nd.com2.z0.glb.qiniucdn.com/4d9e105d119c4068a5438bb9cd73c19d.jpg",
            title: id + "#测试# 柏林韦伯(Bolin BOLIN) WEBB R1-S Monza Razor  R1 手动剃须刀底座",
            price: "¥939",
            buyLink: "http://www.baidu.com",
        };

        const data = { id: id, content };
        const newEditorState = addBlock(editorState, data, type);
        onChange(newEditorState);

        this.setState({
            id: '',
            isOpen: false,
        });
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isHideModal && this.state.isOpen){
            this.setState({isOpen: false});
        }
    }

    render(){

        let className = `draftEditor-styleButton draftEditor-dropdown-title${this.state.isOpen ? ' on':''}`;

        return (<div className="draftEditor-styleCtrls draftEditor-dropdown-wrap"
                     onClick={(event)=>event.stopPropagation()}>
            <a className={className}
               onMouseDown={this.toggleDropdown}
               tabIndex="-1"
               unselectable="on"
               title="insert"
               href="javascript:void(0);">
                <svg className="styleButton-svg"><use xlinkHref={this.props.svg}></use></svg>
            </a>
            <div className="draftEditor-dropdown" style={{display: this.state.isOpen? "block": "none"}}
                 onClick={(event)=>event.stopPropagation()}>
                <div className="draftEditor-input-wrap">
                    <input type="text"
                       placeholder="Enter a valid ID or others."
                       ref="id"
                       value={this.state.id}
                       onChange={this.onInputChange}
                       onKeyDown={this.onInputKeyDown}
                    />
                </div>
                <div className="draftEditor-button-group group-right">
                    <button className="draftEditor-button default-button" onMouseDown={this.onClose}>Cancel</button>
                    <button className="draftEditor-button success-button" onMouseDown={this.onAddInsert}>OK</button>
                </div>
            </div>
        </div>);
    }

}


InsertButton.propTypes = {
    editorState: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    svg: PropTypes.string,
    type: PropTypes.string,
    isHideModal: PropTypes.bool,
};
