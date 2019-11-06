import React from 'react'
import {observer} from 'mobx-react'

// ----------------------------------------------------

@observer
export default class Footer extends React.Component {
    onClearCompleted = () => {
        this.props.store.clearCompleted()
    }

    // ----------------------------------------------------

    render(){
        const {itemsLeft, itemsCompleted, filter, isNoItems} = this.props.store

        const style          = {display: isNoItems ? 'none' : void 0}
        const allClass       = filter === '' ? 'selected' : ''
        const activeClass    = filter === 'active' ? 'selected' : ''
        const completedClass = filter === 'completed' ? 'selected' : ''

        return (
            <footer className="footer" style={style}>
                <span className="todo-count"><strong>{itemsLeft}</strong> item left</span>
                <ul className="filters">
                    <li><a href="#/" className={allClass}>All</a></li>
                    <li><a href="#/active" className={activeClass}>Active</a></li>
                    <li><a href="#/completed" className={completedClass}>Completed</a></li>
                </ul>
                {itemsCompleted ? (
                    <button onClick={this.onClearCompleted} className="clear-completed">Clear completed</button>) : ''}
            </footer>
        )
    }
}
