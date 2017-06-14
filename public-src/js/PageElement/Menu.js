import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {get_submenu, toggleMenu, toggle_Popup_Fullsize} from '../REDUX/actions/actions';

import {menu} from './menu_src'

class Menu extends Component {

    onItemClick(e) {
        let title = e.currentTarget.title;
        let url = e.currentTarget.dataset.url;
        
        
        const {get_submenu,toggle_Popup_Fullsize} = this.props.Actions;
        toggle_Popup_Fullsize(false)
        get_submenu(url, title)
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
                </li>
            )
        });
    }

    autoCloseMenu() {
        const {toggleMenu} = this.props.Actions;
        const {showMenu} = this.props.main;
        
        function removePopups(e) {
            if(!e.target.matches('.heder *') && showMenu) {
                toggleMenu(true);
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

function mapStateToProps(state) {
    return {
        main: state.main,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators({get_submenu, toggleMenu, toggle_Popup_Fullsize}, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
