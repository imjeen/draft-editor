
/*
* custorm block
* */

import { Map } from 'immutable';
import { DefaultDraftBlockRenderMap } from 'draft-js';

const blockRenderMap = Map({
   /* "block-insert": {
        element: 'div'
    },
    "todo": {
        element: 'div'
    },*/
}).merge(DefaultDraftBlockRenderMap);

export default blockRenderMap;
