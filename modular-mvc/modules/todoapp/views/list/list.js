'use strict';

import $ from 'jquery';
import template from './list.pug';
import ListItem from './list-item.js';

// ----------------------------------------------------

let controller, eve;

// ----------------------------------------------------

let view = {

    $list  : null,
    $ul    : null,
    $toggle: null,

    init: (_controller, _eve, $wrap) =>{
        controller = _controller;
        eve        = _eve;

        view.$list   = $(template({}));
        view.$ul     = view.$list.find('.todo-list');
        view.$toggle = view.$list.find('.toggle-all');

        view.$toggle.on('click', view.onToggleClick);
        $wrap.append(view.$list);
    },

    onToggleClick: () =>{
        view.$toggle.is(':checked') ? eve.trigger('setAllCompleted') : eve.trigger('setAllUncompleted');
    },

    render: (todos) =>{
        view.$ul.empty();

        if(todos.length){
            todos.forEach((todo) =>{
                let listItem = new ListItem(todo);
                view.$ul.append(listItem.$item);

                listItem.on('checked', () => eve.trigger('setCompleted', {id: todo.id}));
                listItem.on('unchecked', () => eve.trigger('setUncompleted', {id: todo.id}));
                listItem.on('delete', () => eve.trigger('itemDelete', {id: todo.id}));
                listItem.on('change', (e, value) => eve.trigger('titleChange', {id: todo.id, title: value}));
            });
            view.$list.show();
        }
        else
            view.$list.hide();

    },
};

// ----------------------------------------------------

export default view;
