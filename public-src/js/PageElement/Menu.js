import React, {Component} from 'react';

import { checkStatus, parseJSON} from '../checkJSON';

import { menu } from './menu_src'


class Menu extends Component {

    chengeCategory(url) {
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `category=${ url }`
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                return Object.keys(data)
            })
    }

    onItemClick(e) {
        let url = e.currentTarget.dataset.url
        let field = this.chengeCategory(url)
        console.log('field >>', field)
        this.props.get_submenu(field)
    }

    getItem(items) {
        return items.map(item => {
            return (
                <li className="menu__item" key={item.key}>
                    <a href="#" onClick={::this.onItemClick} className="menu__link" data-url={item.url}><img className="menu__icon" src={'img/menu/' + item.icon}/><span className="menu__item-text">{item.name}</span></a>
                </li>)
        });
    }

    render() {
        return (
            <div id="menu_wrapper" className="menu_wrapper">
                <div className={`icons-menu`} id="menu">
                    <div className="menu">
                        <ul className="menu__items">
                            {this.getItem(menu)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Menu