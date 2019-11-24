
/*
* Get custom classnames
* */

const DEFAULT_CLASS = 'custom-draft-block';

export default function blockStyleFn(contentBlock) {

    const blockType = contentBlock.getType();

    const blockAlignment = contentBlock.getData() && contentBlock.getData().get('text-align');

    let alignClassName = '';
    if(blockAlignment){
        alignClassName = ` ${DEFAULT_CLASS}-${blockAlignment}`;
    }

    switch (blockType){
        // case 'header-one':
        //     return `${DEFAULT_CLASS} ${DEFAULT_CLASS}-header-one`;
        case 'unstyled':
            return `${DEFAULT_CLASS} ${DEFAULT_CLASS}-paragraph ${alignClassName}`;
        case 'blockquote':
            return `${DEFAULT_CLASS} ${DEFAULT_CLASS}-blockquote ${alignClassName}`;
        case 'ordered-list-item':
            return `${DEFAULT_CLASS} ${DEFAULT_CLASS}-ordered-list-item`;
        case 'unordered-list-item':
            return `${DEFAULT_CLASS} ${DEFAULT_CLASS}-unordered-list-item`;
        case 'code-block':
            return `${DEFAULT_CLASS} ${DEFAULT_CLASS}-code-block`;
        case 'atomic':
            return `${DEFAULT_CLASS} ${DEFAULT_CLASS}-atomic`;
        default:
            return `${DEFAULT_CLASS} ${alignClassName}`;
    }

}
