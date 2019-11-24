
import React from 'react';
import ReactDOM from 'react-dom';

import Editor from './index';
import '../static/sass/main.scss';

 document.addEventListener('DOMContentLoaded',function(e){
    ReactDOM.render(
        <Editor />
        , document.getElementById('app') );
 },false);
