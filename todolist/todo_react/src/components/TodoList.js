import React, { Component } from 'react'
import TodoItem from './TodoItem'

class TodoList extends Component {
    render() {
        let todos = this.props.todos
        return (
            <ul>
                {todos.map(t => (
                    <li key={t.id}>
                         <TodoItem todo={t}/>
                    </li>
                ))}
            </ul>
        )
    }
}

export default TodoList
