import 'todomvc-common/base.css'
import 'todomvc-app-css/index.css'
import React from 'react'
import {render} from 'react-dom'
import { configure } from 'mobx'
import TodoApp from 'TodoApp'

// ----------------------------------------------------

configure({
    enforceActions: 'always',
})

// ----------------------------------------------------

render(<TodoApp/>, document.getElementById('app'))
