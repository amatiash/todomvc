import {action, computed, observable} from 'mobx'

// ----------------------------------------------------

export class TodoAppStore {
    @observable todos  = []
    @observable filter = '' // 'active', 'completed'

    // ----------------------------------------------------

    constructor(){
        const todos = JSON.parse(localStorage.getItem('todos'))

        if(Array.isArray(todos))
            this.todos = todos

        this.updateFilter()
    }

    updateStorage(){
        localStorage.setItem('todos', JSON.stringify(this.todos))
    }

    // ----------------------------------------------------

    @computed
    get isNoItems(){
        return !this.todos.length
    }

    @computed
    get itemsLeft(){
        return this.todos.filter((todo) => !todo.completed).length
    }

    @computed
    get itemsCompleted(){
        return this.todos.filter((todo) => todo.completed).length
    }

    @computed
    get isAllCompleted(){
        return this.todos.every((todo) => todo.completed)
    }

    @computed
    get filteredTodos(){
        switch(this.filter){
            case 'active':
                return this.todos.filter((todo) => !todo.completed)
            case 'completed':
                return this.todos.filter((todo) => todo.completed)
            case '':
                return this.todos
        }
    }

    // ----------------------------------------------------

    @action
    setCompleted(todo){
        todo.completed = true
        this.updateStorage()
    }

    @action
    setUncompleted(todo){
        todo.completed = false
        this.updateStorage()
    }

    @action
    setAllCompleted(){
        this.todos.forEach((todo) => todo.completed = true)
        this.updateStorage()
    }

    @action
    setAllUncompleted(){
        this.todos.forEach((todo) => todo.completed = false)
        this.updateStorage()
    }

    @action
    updateFilter(){
        const hashVal = location.hash.slice(2)

        switch(hashVal){
            case 'active':
            case 'completed':
            case '':
                return this.filter = hashVal
        }
    }

    @action
    removeTodo(todo){
        this.todos = this.todos.filter((_todo) => _todo !== todo)
        this.updateStorage()
    }

    @action
    editTodo(todo, newTitle){
        if(!newTitle.trim())
            return this.removeTodo(todo)

        todo.title = newTitle
        this.updateStorage()
    }

    @action
    addTodo(title){
        this.todos.unshift({
            id: Date.now(),
            completed: false,
            title,
        })

        this.updateStorage()
    }

    @action
    clearCompleted(){
        this.todos = this.todos.filter((todo) => !todo.completed)
        this.updateStorage()
    }

    // ----------------------------------------------------

}

// ----------------------------------------------------

export default new TodoAppStore()
