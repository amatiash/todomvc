'use strict';

import React, {Component} from 'react';
import {observer} from "mobx-react";
import Header from './Header';
import List from './List';
import Footer from './Footer';
import TodoAppStore from "./TodoAppStore";

// ----------------------------------------------------

@observer
export default class TodoApp extends Component {

    componentWillMount(){
        window.onhashchange = this.onHashChange;
    }

    onHashChange = () =>{
        TodoAppStore.updateFilter();
    };

    render(){
        return (
            <section class="todoapp">
                <Header store={TodoAppStore}/>
                <List store={TodoAppStore}/>
                <Footer store={TodoAppStore}/>
            </section>
        );
    }
}