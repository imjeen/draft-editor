import React, {Component, PropTypes} from 'react';
import {Entity} from 'draft-js';

export default class AtomicImage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {block} = this.props;
        const {src} = Entity.get(block.getEntityAt(0)).getData();

        if(src === null){
            return '';
        }

        return <audio controls src={src} />;
    }

}


AtomicImage.propTypes = {
    block: PropTypes.object,
};
