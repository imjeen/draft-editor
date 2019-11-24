
import React, {Component, PropTypes} from 'react';
import {Entity} from 'draft-js';

export function findLinkEntities(contentBlock, callback) {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                Entity.get(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
}

export const LinkComponent = (props) => {
    const {href} = Entity.get(props.entityKey).getData();
    return (
        <a href={href} title={href} style={{color: '#3b5998', textDecoration: 'underline',}}>
            {props.children}
        </a>
    );
};

LinkComponent.propTypes = {
    children: PropTypes.node,
    entityKey: PropTypes.string,
};