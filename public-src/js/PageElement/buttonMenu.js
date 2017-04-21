import React, { Component } from 'react';

class ButtonMenu extends Component {
    omButtonMenuClick(e) {
        this.props.toggleMenu(this.props.showMenu)
    }

    render() {
        return (
            <i className="fa fa-bars fa-2x menu_ico" onClick={::this.omButtonMenuClick} id="hide_menu"/>
        )
    }
}

export default ButtonMenu



