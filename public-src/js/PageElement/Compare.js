import React, {Component} from 'react';
import {connect} from 'react-redux';

class Compare extends Component {
    getInfoCompare() {
        const {compareSet, alias, curency} = this.props.map_reducer;
        let tempArr = [];
        compareSet.forEach(item => {
            console.log('item >>', item)
            let feature = item;
        })

        return tempArr
    }


    render() {
    console.log('compare')
        return (
            <div className="compareCahrt">
                <div className="item_header">
                    <div className="map_heder_title">Порівняння територій</div>
                </div>
                <div className="item_content">
                    {::this.getInfoCompare()}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        map_reducer: state.map_reducer
    }
}

export default connect(mapStateToProps)(Compare);








