import React, {Component} from 'react'
import {observer} from 'mobx-react'
import ListItem from './ListItem'

// ----------------------------------------------------

@observer
export default class List extends Component {
    componentDidMount  = () => this.setCheckbox()
    componentDidUpdate = () => this.setCheckbox()

    setCheckbox(){
        this.checkbox.checked = this.props.store.isAllCompleted
    }

    // ----------------------------------------------------

    onCheckboxChange = (e) => {
        const store = this.props.store

        e.target.checked ? store.setAllCompleted() : store.setAllUncompleted()
    }

    // ----------------------------------------------------

    render(){
        const store = this.props.store
        const style = {display: store.isNoItems ? 'none' : void 0}
        const items = store.filteredTodos.map((todo) => (
            <ListItem key={todo.id} todo={todo} store={store}/>))

        const {isAllCompleted} = store // Used for componentDidUpdate

        return (
            <section className="main" style={style}>
                <input
                    ref={(checkbox) => this.checkbox = checkbox}
                    onChange={this.onCheckboxChange}
                    className="toggle-all"
                    id="toggle-all"
                    type="checkbox"
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <ul className="todo-list">
                    {items}
                </ul>
            </section>
        )
    }
}
