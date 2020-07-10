import React, { Component } from 'react'
import Menu from './Menu'

class HomePage extends Component {
    render() {
        let path = this.props.match.path
        console.log('path in home', path)
        return (
            <div>
                <Menu path={path}/>
                 Welcome to my page
            </div>
        )
    }
}

export default HomePage
