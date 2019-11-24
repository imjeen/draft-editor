
import {Entity} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import { COLORS, FONTSIZES } from '../constant';

export default function (editorState) {
    const editorContent = editorState.getCurrentContent();
    return stateToHTML(editorContent, OPTIONS);
}

// --------------------------------------------------
let inlineStyleMap = {
    color: {},
    fontSize: {},
};

COLORS.forEach((color)=>{
    inlineStyleMap.color[`color-${color}`] = {
        style: {color: color}
    }
});

FONTSIZES.forEach((size)=>{
    inlineStyleMap.fontSize[`fontSize-${size}`] = {
        style: {fontSize: size}
    }
});


const OPTIONS = {
    inlineStyles: {
        ...inlineStyleMap.color,
        ...inlineStyleMap.fontSize,
    },
    blockRenderers: {
        "atomic": (contentBlock) => {

            const type = Entity.get(contentBlock.getEntityAt(0)).getType();
            const data = Entity.get(contentBlock.getEntityAt(0)).getData();

            switch (type) {
                case 'atomic:image':
                    return imageRender(data);
                case 'atomic:video':
                    return videoRender(data);
                case 'atomic:insert':
                    return insertRender(data);
                case 'atomic:line':
                    return lineRender();
                default:
                    return ``;
            }


        },
    },
    blockStyleFn: (contentBlock) => {

        const blockType = contentBlock.getType();
        const blockAlignment = contentBlock.getData() && contentBlock.getData().get('text-align');
        const DEFAULT_CLASS = 'custom-draft-block';

        let alignClassName = '';
        if(blockAlignment){
            alignClassName = ` ${DEFAULT_CLASS}-${blockAlignment}`;
        }

        switch (blockType) {
            // case 'header-one':
            //     return {
            //         attributes: {
            //             class: `${DEFAULT_CLASS} ${DEFAULT_CLASS}-header-one`,
            //         }
            //     };
            case 'unstyled':
                return {
                    attributes: {
                        class: `${DEFAULT_CLASS} ${DEFAULT_CLASS}-paragraph ${alignClassName}`,
                    }
                };
            case 'blockquote':
                return {
                    attributes: {
                        class: `${DEFAULT_CLASS} ${DEFAULT_CLASS}-blockquote ${alignClassName}`,
                    }
                };
            case 'ordered-list-item':
                return {
                    attributes: {
                        class: `${DEFAULT_CLASS} ${DEFAULT_CLASS}-ordered-list-item`,
                    }
                };
            case 'unordered-list-item':
                return {
                    attributes: {
                        class: `${DEFAULT_CLASS} ${DEFAULT_CLASS}-unordered-list-item`,
                    }
                };
            case 'code-block':
                return {
                    attributes: {
                        class: `${DEFAULT_CLASS} ${DEFAULT_CLASS}-code-block`,
                    }
                };
            case 'atomic':
                return {
                    attributes: {
                        class: `${DEFAULT_CLASS} ${DEFAULT_CLASS}-atomic`,
                    }
                };
            default:
                return {
                    attributes: {
                        class: `${DEFAULT_CLASS} ${alignClassName}`,
                    }
                };
        }
    }
};

// --------------------------------------------------

function lineRender() {
    return `<div class="custom-draft-block custom-draft-block-atomic"><hr class="atomic-block-hr"/></div>`;
}

function imageRender(data){
    return (`<figure class="custom-draft-block custom-draft-block-atomic">
        <img src="${data.src}" alt="${data.src}">
    </figure>`);
}

function videoRender(data){
    return (`<figure class="custom-draft-block custom-draft-block-atomic">
        <video src="${data.src}"></video>
    </figure>`);
}

function insertRender(data){

    return `<div class="custom-draft-block custom-draft-block-atomic">
        <div class="atomic-block-insert"  data-id="${data.id}"}>
            <div class="insert-wrap">
                <div class="insert-cover"><img src="${data.content.img}" alt="${data.content.img}"/></div>
                <div class="insert-content">
                    <div class="insert-title">${data.content.title}</div>
                    <div class="insert-banner">
                        <span class="insert-price">${data.content.price}</span>
                        <a class="insert-btn" href=${data.content.buyLink}>去购买</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
}

