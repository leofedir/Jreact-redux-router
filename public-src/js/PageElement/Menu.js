import React, {Component} from 'react';

import { menu } from './menu_src'

class Menu extends Component {

    getItem(items) {
        return items.map(item => {
            return (
                <li className="menu__item" key={item.key}>
                    <a href="#" className="menu__link" data-url={item.url}><img className="menu__icon" src={'img/menu/' + item.icon}/><span className="menu__item-text">{item.name}</span></a>
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