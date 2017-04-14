import React, {Component, PropTypes} from 'react';

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

ButtonMenu.propTypes = {
    toggleMenu: PropTypes.func.isRequired
}

export default ButtonMenu



