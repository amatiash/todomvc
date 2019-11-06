import React, {Component} from 'react'
import {observer} from 'mobx-react'

// ----------------------------------------------------

const ENTER = 13
const ESC   = 27

// ----------------------------------------------------

@observer
export default class ListItem extends Component {
    constructor(){
        super()
        this.state = {
            isEditing: false,
        }
    }

    componentDidUpdate(){
        if(this.state.isEditing){
            this.input.focus()
            document.addEventListener('keyup', this.onKeyPress)
        }
    }

    // ----------------------------------------------------

    onCheckboxChange = (e) => {
        const store = this.props.store
        const todo  = this.props.todo

        e.target.checked ? store.setCompleted(todo) : store.setUncompleted(todo)
    }

    onRemove = () => {
        this.props.store.removeTodo(this.props.todo)
    }

    onStartEdit = () => {
        this.setState({isEditing: true})
    }

    onFinishEdit = () => {
        document.removeEventListener('keyup', this.onKeyPress)
        this.setState({isEditing: false})

        const newVal  = this.input.value
        const prevVal = this.props.todo.title

        if(newVal !== prevVal)
            this.props.store.editTodo(this.props.todo, newVal)
    }

    onKeyPress = (e) => {
        if(e.keyCode === ENTER)
            this.input.blur()
        else if(e.keyCode === ESC){
            this.input.value = this.props.todo.title
            this.input.blur()
        }
    }

    // ----------------------------------------------------

    render(){
        const todo           = this.props.todo
        const editingClass   = this.state.isEditing ? 'editing' : ''
        const completedClass = this.props.todo.completed ? 'completed' : ''
        const liClass        = `${editingClass} ${completedClass}`.trim()

        return (
            <li className={liClass}>
                <div className="view">
                    <input onChange={this.onCheckboxChange} type="checkbox" checked={todo.completed}
                           className="toggle"/>
                    <label onDoubleClick={this.onStartEdit}>{todo.title}</label>
                    <button onClick={this.onRemove} className="destroy"></button>
                </div>
                <input ref={(input) => this.input = input}
                       className="edit"
                       defaultValue={todo.title}
                       onBlur={this.onFinishEdit}
                />
            </li>
        )
    }
}
