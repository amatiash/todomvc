'use strict';

import $ from 'jquery';
import template from './header.pug';

// ----------------------------------------------------

const ENTER = 13;

// ----------------------------------------------------

let controller, eve;

// ----------------------------------------------------

let view = {

    $header: null,

    $input : null,

    init: (_controller, _eve, $wrap) =>{
        controller = _controller;
        eve        = _eve;

        view.$header = $(template({}));
        view.$input  = view.$header.find('input.new-todo');
        view.$input.on('focus', view.onInputFocus);
        view.$input.on('blur', view.onInputBlur);
        $wrap.append(view.$header);
    },

    onInputFocus: () => $(document).on('keyup.newTodoInputEdit', view.handleKeyPress),

    onInputBlur: () => $(document).off('keyup.newTodoInputEdit'),

    handleKeyPress: (e) =>{
        if(e.keyCode === ENTER){
            let val = view.$input.val().trim();

            if(val){
                eve.trigger('newTodo', {
                    id: Date.now(),
                    title: val,
                    completed: false
                });
                view.$input.val('');
            }

        }
    },
};

// ----------------------------------------------------

export default view;