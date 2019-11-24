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
        //<video controls src={src} />
        return <iframe src={src} style={{width: "100%", maxWidth: "650px", height: "360px"}} frameBorder="0" allowFullScreen></iframe>;

    }

}


AtomicImage.propTypes = {
    block: PropTypes.object,
};
