import React, { PureComponent  } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleMenu} from '../REDUX/actions/actions';


class ButtonMenu extends PureComponent  {
    onButtonMenuClick(e) {
        const {showMenu} = this.props.main;
        const {toggleMenu} = this.props.Actions;
        
        toggleMenu(showMenu)
    }

    render() {
        return (
            <i className="fa fa-bars fa-1x menu_ico" onClick={::this.onButtonMenuClick} id="hide_menu"/>
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
        Actions: bindActionCreators({toggleMenu}, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonMenu);
