
import { EditorState, CompositeDecorator, convertFromRaw } from 'draft-js';
import {LinkComponent, findLinkEntities} from './linkDecorator';

const customDecorator = new CompositeDecorator([
    { 
        strategy: findLinkEntities, 
        component: LinkComponent 
    },
]);

const createEditorState = (content=null, decorator=null)=>{

    let _decrator = customDecorator;

    if(content === null){
        return EditorState.createEmpty(_decrator);
    }

    if(decorator !== null){
        _decrator = decorator;
    }

    return EditorState.createWithContent(convertFromRaw(content), _decrator);

};

export default createEditorState;
