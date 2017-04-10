import React, { Component } from 'react';


let tableStore = {};
let url;

class SubMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: props.parametr
        };
    }

    getListMaps(){
        console.log('getListMaps')
        url = this.state.category;

    }

    componentWillReceiveProps(nextProps) {
        if(JSON.stringify(this.props.parametr) !== JSON.stringify(nextProps.parametr))
        {
            this.setState({
                category: nextProps.parametr
            })

        }
    }

    componentDidMount() {
        console.log('did mount')
    }

    componentWillUpdate(np , ns) {

        console.log('will update' , np);
    }

    componentDidUpdate() {
        console.log('did update')
    }

    getItem(items) {
        console.log('get itemsu')
        return items.map((item, i) => {
            return (
                <option  className="menu__item" key={i} value="volvo">
                    {item}
                </option >)
        });
    }

    render() {
        console.log('this.props >>', this.props)

        return (
            <div className="map_heder_title">
                {this.getListMaps()}
                {tableStore[url] ? <select>{this.getItem(tableStore[url])}</select> : ''}
            </div>
        )
    }
}

export default SubMenu;