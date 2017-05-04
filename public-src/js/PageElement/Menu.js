import React, {Component} from 'react';

import {menu} from './menu_src'


class Menu extends Component {

    onItemClick(e) {
        let title = e.currentTarget.title;
        let url = e.currentTarget.dataset.url;
        this.props.get_submenu(url, title)
    }

    getItem(items) {
        return items.map(item => {
            return (
                <li className="menu__item" key={item.key}>
                    <a title={item.name} href="#" onClick={::this.onItemClick} className="menu__link"
                       data-url={item.url}>
                        <img className="menu__icon" src={'img/menu/' + item.icon}/>
                        <span className="menu__item-text">{item.name}</span>
                    </a>
                </li>)
        });
    }

    autoCloseMenu() {
        function removePopups(e) {
            if(!e.target.matches('.heder *') && this.props.showMenu) {
                this.props.toggleMenu(true)
                window.removeEventListener('click', removePopups);
            }
        };
        window.addEventListener('click', removePopups.bind(this));
    }

    componentDidMount() {
        this.autoCloseMenu()
    }

    componentDidUpdate() {
        this.autoCloseMenu()
    }

    render() {
        return (
            <ul className="menu__items">
                {this.getItem(menu)}
            </ul>
        )
    }
}

export default Menu