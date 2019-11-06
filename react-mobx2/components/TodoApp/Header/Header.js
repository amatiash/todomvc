import React from 'react'

// ----------------------------------------------------

export default class Header extends React.Component {
    onStartEdit = () => {
        document.addEventListener('keyup', this.onKeyPress)
    }

    onFinishEdit = () => {
        document.removeEventListener('keyup', this.onKeyPress)
    }

    onKeyPress = (e) => {
        const ENTER = 13

        if(e.keyCode === ENTER){
            const newTitle = this.input.value.trim()

            if(newTitle){
                this.props.store.addTodo(newTitle)
            }

            this.input.value = ''
        }
    }

    // ----------------------------------------------------

    render(){
        return (
            <header className="header">
                <h1>todos</h1>
                <input
                    placeholder="What needs to be done?"
                    autoFocus={true}
                    className="new-todo"
                    onFocus={this.onStartEdit}
                    onBlur={this.onFinishEdit}
                    ref={(input) => this.input = input}
                />
            </header>
        )
    }
}
