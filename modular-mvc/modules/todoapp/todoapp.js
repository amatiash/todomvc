'use strict';

import $ from 'jquery';
import JEves from 'jeves';
import model from './model';
import headerView from './views/header';
import footerView from './views/footer';
import listView from './views/list';

/**
 * @type {jQuery}
 */
const eve = new JEves();

// ----------------------------------------------------

let controller = {

    /** Init views, subscribe to event */
    init: () =>{
        model.init();

        // ----------------------------------------------------

        let $wrap = $('<section class="todoapp"></section>');
        $(document.body).append($wrap);

        // ----------------------------------------------------

        headerView.init(controller, eve, $wrap);
        listView.init(controller, eve, $wrap);
        footerView.init(controller, eve, $wrap);
        controller.render();

        // ----------------------------------------------------

        window.onhashchange = controller.render;

        eve.on('setCompleted', controller.onSetCompleted);
        eve.on('setUncompleted', controller.onSetUncompleted);
        eve.on('setAllCompleted', controller.onSetAllCompleted);
        eve.on('setAllUncompleted', controller.onSetAllUncompleted);
        eve.on('itemDelete', controller.onItemDelete);
        eve.on('titleChange', controller.onTitleChange);
        eve.on('clearCompleted', controller.onClearCompleted);
        eve.on('newTodo', controller.onNewTodo);
    },

    render: () =>{
        let todos   = model.todos,
            hashVal = location.hash.slice(2);

        // ----------------------------------------------------

        switch(hashVal){
            case 'active':
                todos = model.todos.filter((todo) => !todo.completed);
                break;
            case 'completed':
                todos = model.todos.filter((todo) => todo.completed);
                break;
            case '':
                break;
            default:
                return;
        }

        // ----------------------------------------------------

        if(model.todos.length){
            listView.show();
            footerView.show();

            // ----------------------------------------------------

            listView.render(todos);
            footerView.setActiveFilter(hashVal);
            footerView.setCounter(controller.getItemsLeft());

            // ----------------------------------------------------

            let completedLength = todos.filter((todo) => todo.completed).length;

            if(completedLength)
                footerView.showClearBtn();
            else
                footerView.hideClearBtn();

        } else {
            listView.hide();
            footerView.hide();
        }

        // ----------------------------------------------------

        model.writeTodos();
    },

    getItemsLeft: () => model.todos.filter((todo) => !todo.completed).length,

    getTodo: (id) => model.todos.find((todo) => todo.id === id),

    // Event handlers
    // ----------------------------------------------------

    onNewTodo: (e, todo) =>{
        model.todos.unshift(todo);
        controller.render();
    },

    onSetAllCompleted: () =>{
        model.todos.forEach((todo) => todo.completed = true);
        controller.render();
    },

    onSetAllUncompleted: () =>{
        model.todos.forEach((todo) => todo.completed = false);
        controller.render();
    },

    onSetCompleted: (e, {id}) =>{
        let todo = controller.getTodo(id);
        todo && (todo.completed = true);
        controller.render();
    },

    onSetUncompleted: (e, {id}) =>{
        let todo = controller.getTodo(id);
        todo && (todo.completed = false);
        controller.render();
    },

    onItemDelete: (e, {id}) =>{
        model.todos = model.todos.filter((todo) => todo.id !== id);
        controller.render();
    },

    onTitleChange: (e, {id, title}) =>{
        let todo = controller.getTodo(id);

        if(todo){
            todo.title = title;
            controller.render();
        }
    },

    onClearCompleted: () =>{
        model.todos = model.todos.filter((todo) => !todo.completed);
        controller.render();
    }
};

// ----------------------------------------------------

export default {init: controller.init};