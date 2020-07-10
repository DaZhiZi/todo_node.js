import React, {Component} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import HomePage from './components/Home'
import TodoPage from './components/Todo'
import TodoDetailPage from './components/TodoDetail'

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/todo" component={TodoPage} />
                    <Route path="/todo/:id" component={TodoDetailPage} />
                </div>
            </Router>
        )
    }
}

export default App
