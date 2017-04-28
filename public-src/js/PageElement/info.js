import React, { Component } from 'react';

class Info extends Component {

    render() {
        let info = this.props.info;
        return (
            <div className="info">
                <div className="item_header">
                    <div className="map_heder_title">Довідка</div>
                </div>
                <div className="item_content">
                    <div id="info"
                         dangerouslySetInnerHTML={info ? {__html: info} : {__html: '&nbsp; &nbsp;Україна - держава у Східній Європі. Столиця - м.Київ. Площа - 60 357 712 га. Населення - 44 933 290 особи'}}/>
                </div>
            </div>
        )
    }
}

export default Info







