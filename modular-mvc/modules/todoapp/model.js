'use strict';

// ----------------------------------------------------

let model = {

    init : () =>{
        try {
            let todos = JSON.parse(localStorage.getItem('todos'));

            if(!Array.isArray(todos))
                model.todos = [];
            else
                model.todos = todos
        }
        catch(e) {
            model.todos = [];
        }
    },

    writeTodos: () =>{
        localStorage.setItem('todos', JSON.stringify(model.todos));
    },

    todos: [],

    // {
    //     title    : "Learn trading",
    //     completed: true,
    //     id       : 1504713447399
    // }

    hashVal: '', // 'active', 'completed'
};

// ----------------------------------------------------

export default model;
