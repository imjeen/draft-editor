
import React, {Component, PropTypes} from 'react';
import {Entity, EditorBlock} from 'draft-js';
// import {updateDataOfBlock} from '../../util/index';

export default class Insert extends Component {

    constructor(props){
        super(props);
        this.onRemove = this._onRemove.bind(this);
    }

    _onRemove(){
        this.props.blockProps.onRemove(this.props.block.getKey());
    }

    _getContent(){
        const entity = Entity.get( this.props.block.getEntityAt(0) );
        return entity.getData()['centent']
    }


    render(){

        const data = Entity.get(this.props.block.getEntityAt(0)).getData();

        return <div className="atomic-block-insert" contentEditable={false} data-id={data.id}>
            <div className="insert-wrap">
                <div className="insert-cover"><img src={data.content.img} alt={data.content.img}/></div>
                <div className="insert-content">
                    <div className="insert-title">{data.content.title}</div>
                    <div className="insert-banner">
                        <span className="insert-price">{data.content.price}</span>
                        <a className="insert-btn" href={data.content.buyLink}>去购买</a>
                    </div>
                </div>
            </div>
            <span className="close-icon" onClick={this.onRemove}>X</span>
        </div>;
        
    }

}

Insert.propTypes = {
    block: PropTypes.object,
    blockProps: PropTypes.object,
};
