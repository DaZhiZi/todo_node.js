import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

class Menu extends Component {
    classForPath = (menu) => {
        let path = this.props.path
        let c = classNames({
            'active': menu.url === path,
        })
        return c
    }
    render() {
        let menus = [
            {
                text: 'homePage',
                url: '/',
            },
            {
                text: 'todoPage',
                url: '/todo',
            },
        ]
        return (
            <nav>
                {
                    menus.map((e, index) =>
                         <Link to={e.url} key={index}
                              className={this.classForPath(e)}>
                            {e.text}
                        </Link>
                    )
                }
            </nav>
        )
    }
}

export default Menu
