
import React from 'react';

import {Entity} from 'draft-js';
import removeBlock from '../modifiers/removeBlock';

import AtomicImage from './atomic/image';
// import AtomicAudio from './atomic/video'
import AtomicVideo from './atomic/video'
import AtomicInsert from './atomic/insert';
import AtomicLine from './atomic/line';

const customBlockRenderderFn = (setEditorState, getEditorState) =>{

    return (contentBlock)=> {

        const blockType = contentBlock.getType();

        if (blockType !== 'atomic') {
            return null;
        }

        //------------------------------------------------
        // just for atomic children

        const type = Entity.get(contentBlock.getEntityAt(0)).getType();

        switch (type) {
            case 'atomic:line':
                return {
                    component: AtomicLine,
                    // editable: true,
                };
            case 'atomic:image':
                return {
                    component: AtomicImage,
                    // editable: true,
                };
            case 'atomic:video':
                return {
                    component: AtomicVideo,
                    // editable: true,
                };
            // case 'atomic:audio':
            //     return {
            //         component: AtomicAudio,
            //         editable: false,
            //     };
            case 'atomic:insert':
                return {
                    component: AtomicInsert,
                    editable: false,
                    props: {
                        onRemove: (blockKey)=>{
                            const oldEditorState = getEditorState();
                            const newEditorState = removeBlock(oldEditorState, blockKey);
                            setEditorState(newEditorState);
                        },
                    }
                };
            default:
                return <p>No supported block for {type}</p>;
        }
    };

};

export default customBlockRenderderFn;
