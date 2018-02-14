'use strict';

import React, {Component} from 'react';
import {observer} from "mobx-react";
import ListItem from './ListItem'

// ----------------------------------------------------

@observer
export default class List extends Component {
    componentDidMount  = () => this.setCheckbox();
    componentDidUpdate = () => this.setCheckbox();

    setCheckbox(){
        this.checkbox.checked = this.props.store.isAllCompleted;
    }

    // ----------------------------------------------------

    onCheckboxChange = (e) =>{
        let store = this.props.store;

        e.target.checked ? store.setAllCompleted() : store.setAllUncompleted();
    };

    // ----------------------------------------------------

    render(){
        let store            = this.props.store,
            style            = {display: store.isNoItems ? 'none' : void 0},
            items            = store.filteredTodos.map(todo => (<ListItem key={todo.id} todo={todo} store={store}/>)),
            {isAllCompleted} = store; // Used for componentDidUpdate

        return (
            <section class="main" style={style}>
                <input
                    ref={(checkbox) => this.checkbox = checkbox}
                    onChange={this.onCheckboxChange}
                    class="toggle-all"
                    id="toggle-all"
                    type="checkbox"
                />
                <label for="toggle-all">Mark all as complete</label>
                <ul class="todo-list">
                    {items}
                </ul>
            </section>
        );
    }
}
