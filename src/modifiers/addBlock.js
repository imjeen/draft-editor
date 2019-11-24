

import {Entity, AtomicBlockUtils} from 'draft-js';

export default (editorState, data, type)=> {

    const entityKey = Entity.create(type, 'IMMUTABLE', data);

    return AtomicBlockUtils.insertAtomicBlock( editorState, entityKey, ' ');

}

//------------------------------------
/*
import {List, Repeat} from 'immutable';
import {
    EditorState,
    Entity,
    Modifier,
    BlockMapBuilder,
    ContentBlock,
    CharacterMetadata,
    genKey,
} from 'draft-js';

export default function (editorState, type, data) {

    const entityKey = Entity.create(type, 'IMMUTABLE', data);

    var contentState = editorState.getCurrentContent();
    var selectionState = editorState.getSelection();

    var afterRemoval = Modifier.removeRange(contentState, selectionState, 'backward');

    var targetSelection = afterRemoval.getSelectionAfter();
    var afterSplit = Modifier.splitBlock(afterRemoval, targetSelection);
    var insertionTarget = afterSplit.getSelectionAfter();

    var asAtomicBlock = Modifier.setBlockType(afterSplit, insertionTarget, type);

    var charData = CharacterMetadata.create({ entity: entityKey });

    var fragmentArray = [new ContentBlock({
        key: genKey(),
        type: type,
        text: ' ',
        characterList: List(Repeat(charData, 1))
    }), new ContentBlock({
        key: genKey(),
        type: 'unstyled',
        text: '',
        characterList: List()
    })];

    var fragment = BlockMapBuilder.createFromArray(fragmentArray);

    var withAtomicBlock = Modifier.replaceWithFragment(asAtomicBlock, insertionTarget, fragment);

    var newContent = withAtomicBlock.merge({
        selectionBefore: selectionState,
        selectionAfter: withAtomicBlock.getSelectionAfter().set('hasFocus', true)
    });

    var newEditorState = EditorState.push(editorState, newContent, 'insert-fragment');

    return {
        editorKey: entityKey,
        editorState: newEditorState,
    }

}
*/
