'use strict';

import React, {Component} from 'react';
import {observer} from "mobx-react";

// ----------------------------------------------------

const ENTER = 13;
const ESC   = 27;

// ----------------------------------------------------

@observer
export default class ListItem extends Component {
    constructor(){
        super();
        this.state = {
            isEditing: false,
        };
    }

    componentDidUpdate(){
        if(this.state.isEditing){
            this.input.focus();
            document.addEventListener('keyup', this.onKeyPress);
        }
    }

    // ----------------------------------------------------

    onCheckboxChange = (e) =>{
        let store = this.props.store,
            todo  = this.props.todo;

        e.target.checked ? store.setCompleted(todo) : store.setUncompleted(todo);
    };

    onRemove = () =>{
        this.props.store.removeTodo(this.props.todo)
    };

    onStartEdit = () =>{
        this.setState({isEditing: true});
    };

    onFinishEdit = () =>{
        document.removeEventListener('keyup', this.onKeyPress);
        this.setState({isEditing: false});

        let newVal  = this.input.value,
            prevVal = this.props.todo.title;

        if(newVal !== prevVal)
            this.props.store.editTodo(this.props.todo, newVal);
    };

    onKeyPress = (e) =>{
        if(e.keyCode === ENTER)
            this.input.blur();
        else if(e.keyCode === ESC){
            this.input.value = this.props.todo.title;
            this.input.blur();
        }
    };

    // ----------------------------------------------------

    render(){
        let todo           = this.props.todo,
            editingClass   = this.state.isEditing ? 'editing' : '',
            completedClass = this.props.todo.completed ? 'completed' : '',
            liClass        = `${editingClass} ${completedClass}`.trim();

        return (
            <li class={liClass}>
                <div class="view">
                    <input onChange={this.onCheckboxChange} type="checkbox" checked={todo.completed} class="toggle"/>
                    <label onDoubleClick={this.onStartEdit}>{todo.title}</label>
                    <button onClick={this.onRemove} class="destroy"></button>
                </div>
                <input ref={(input) => this.input = input}
                       class="edit"
                       defaultValue={todo.title}
                       onBlur={this.onFinishEdit}
                />
            </li>
        );
    }
}