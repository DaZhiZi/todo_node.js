import React, { Component } from 'react'
import Menu from './Menu'
import TodoList from './TodoList'
import TodoCounter from './TodoCounter'
import TodoApi from '../api/todo'
import TodoContext from './todo-context'

import './todo.css'

class TodoPage extends Component {
    constructor(props) {
        super(props)
        this.api = new TodoApi()
        this.state = {
            todos: [],
            text: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
        this.onDelete = this.onDelete.bind(this)
    }

    componentDidMount() {
        this.api.all(r => {
            this.setState({
                todos: r,
            })
        })
    }

    onUpdate(todo) {
        let todos = this.state.todos
        let t = todos.find(function(e) {
            return e.id === todo.id
        })
        t.done = todo.done
        this.setState({
            todos: todos,
        })
    }

    onDelete(id) {
        let todos = this.state.todos
        let index = todos.findIndex(e => e.id === id)
        todos.splice(index, 1)
        this.setState({
            todos: todos,
        })
    }

    render() {
        let todos = this.state.todos
        let path = this.props.match.path
        let actions = {
            onUpdate: this.onUpdate,
            onDelete: this.onDelete,
        }
        return (
            <div className={'yy-container'}>
                <TodoContext.Provider value={actions}>
                    <Menu path={path}/>
                    <h3>UNIQUE NOTEBOOK</h3>
                    <TodoList todos={todos} />
                    <TodoCounter todos={todos}/>
                    <form onSubmit={this.onSubmit}>
                        <label htmlFor="new-todo">
                            输入事项
                        </label>
                        <input
                            id="new-todo"
                            onChange={this.onChange}
                            value={this.state.text}
                        />
                        <button>
                            添加第 {todos.length + 1} 个 事项
                        </button>
                    </form>
                </TodoContext.Provider>
            </div>
        )
    }

    onChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()
        if (this.state.text.length === 0) {
            return
        }
        let task = this.state.text
        let data = {
            task,
        }
        let todos = this.state.todos
        this.api.add(data, (r) => {
            todos.push(r)
            this.setState({
                todos: todos,
                text: '',
            })
        })
    }
}

export default TodoPage
