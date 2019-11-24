
import {EditorState, Modifier, SelectionState } from 'draft-js';

export default function (editorState, blockKey) {
    
    var content = editorState.getCurrentContent();
    var block = content.getBlockForKey(blockKey);

    var targetRange = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: block.getLength(),
        // isBackward: false,
        // hasFocus: false
    });

    var withoutCustomBlock = Modifier.removeRange(content, targetRange, 'backward');
    var resetBlock = Modifier.setBlockType(withoutCustomBlock, withoutCustomBlock.getSelectionAfter(), 'unstyled');

    var newState = EditorState.push(editorState, resetBlock, 'remove-range');

    return EditorState.forceSelection(newState, resetBlock.getSelectionAfter());

}
