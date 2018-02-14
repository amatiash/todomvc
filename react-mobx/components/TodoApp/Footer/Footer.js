'use strict';

import React from 'react';
import {observer} from "mobx-react";

// ----------------------------------------------------

@observer
export default class Footer extends React.Component {
    onClearCompleted = () =>{
        this.props.store.clearCompleted()
    };

    // ----------------------------------------------------

    render(){
        let {itemsLeft, itemsCompleted, filter, isNoItems} = this.props.store;

        let style          = {display: isNoItems ? 'none' : void 0},
            allClass       = filter === '' ? 'selected' : '',
            activeClass    = filter === 'active' ? 'selected' : '',
            completedClass = filter === 'completed' ? 'selected' : '';

        return (
            <footer class="footer" style={style}>
                <span class="todo-count"><strong>{itemsLeft}</strong> item left</span>
                <ul class="filters">
                    <li><a href="#/" class={allClass}>All</a></li>
                    <li><a href="#/active" class={activeClass}>Active</a></li>
                    <li><a href="#/completed" class={completedClass}>Completed</a></li>
                </ul>
                {itemsCompleted ? (
                    <button onClick={this.onClearCompleted} class="clear-completed">Clear completed</button>) : ''}
            </footer>
        );
    }
}