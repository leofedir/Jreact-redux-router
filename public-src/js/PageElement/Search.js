import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../REDUX/actions/actions';

import {Lmap} from './Map'

let timer;

class Search extends Component {

    styleInput() {
        let {show_input} = this.props.main;
        return {
            width: show_input ? '250px' : '0',
            transition: 'all 0.3s ease 0s'
        }
    }

    search() {
        let {show_input} = this.props.main;
        let {showInput} = this.props.Actions;
        showInput(show_input)
    }

    handleChange(e) {
        let val = e.target.value.trim();
        let {changeInpeuSearch} = this.props.Actions;
        let {claster_layers} = this.props.main;
        changeInpeuSearch(val);

        // if (claster_layers !== null) {
        //     let filtered;
        //     clearTimeout(timer);
        //     if (val.length > 2) {
        //         timer = setTimeout(() => {
        //             // claster_layers.forEach(item => {
        //             //     filtered = item[1].features.filter(item => {
        //             //         let curent = item.properties.nameua;
        //             //         console.log(curent.toLowerCase().indexOf(val.toLowerCase()) < 0)
        //             //         return (curent.toLowerCase().indexOf(val.toLowerCase()) < 0) ? false : curent
        //             //     })
        //             //
        //             // });
        //             // console.log("filtered >>", filtered)
        //             console.log('Lmap >>', Lmap)
        //         }, 500)
        //     }
        // }

    }

    render() {
        let {claster_layers} = this.props.main;
        let {curentMap} = this.props.map_reducer;
        let showBlock = claster_layers || curentMap;
        console.log('showBlock >>', !!showBlock)
        return (
            <div className={ `search_div ${ !!showBlock ? 'active' : ''}` }>
                <i className="fa fa-search fa-1x search_icon" onClick={::this.search} id="search"/>
                <input className="search_input" style={::this.styleInput()} type="text"
                       value={this.props.main.searchValue} onChange={::this.handleChange}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        main: state.main,
        map_reducer: state.map_reducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        Actions: bindActionCreators(Actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
