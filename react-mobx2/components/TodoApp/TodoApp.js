import React, {Component} from 'react'
import {observer} from 'mobx-react'
import Header from './Header'
import List from './List'
import Footer from './Footer'
import TodoAppStore from './TodoAppStore'

// ----------------------------------------------------

@observer
class TodoApp extends Component {

    componentWillMount(){
        window.onhashchange = this.onHashChange
    }

    onHashChange = () => {
        TodoAppStore.updateFilter()
    }

    render(){
        return (
            <section className="todoapp">
                <Header store={TodoAppStore}/>
                <List store={TodoAppStore}/>
                <Footer store={TodoAppStore}/>
            </section>
        )
    }
}

export default TodoApp
