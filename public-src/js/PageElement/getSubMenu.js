import React, { Component } from 'react';
import { alias } from '../aliasMapName'
import getMapArea from '../getMapArea'

let tableStore = {};
let url;

class SubMenu extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         category: props.category,
    //         fields: props.fields
    //     };
    // }

    // componentWillReceiveProps(nextProps) {
    //     if(JSON.stringify(this.props.category) !== JSON.stringify(nextProps.category))
    //     {
    //         this.setState({
    //             category: nextProps.category,
    //         })
    //
    //     }
    //
    //     if(JSON.stringify(this.props.fields) !== JSON.stringify(nextProps.fields))
    //     {
    //         this.setState({
    //             fields: nextProps.fields
    //         })
    //
    //     }
    // }

    getMap(e) {
        getMapArea(e.target.value)
        console.log('terget',e.target.value)
    }

    getItem(){
        console.log('this.props >>', this.props)
        const items = this.props.fields.map((item, i) => {
            return <option  className="menu__item" key={i} value={item}>
                {alias[item] ? alias[item] : item}
            </option>
        });
        return (
            <select className="test" onChange={this.getMap}>
                {items}
            </select>
        )
    }

    render() {
        return (
            <div className="map_heder_title">
                {this.props.fields ? this.getItem() : ''}
            </div>
        )
    }
}

export default SubMenu;