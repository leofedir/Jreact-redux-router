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
                         dangerouslySetInnerHTML={info ? {__html: info} : {__html: '&nbsp;&nbsp;Україна - держава у Східній Європі. <p>&nbsp;&nbsp;Площа території - 60 357 712 га.<p>&nbsp;&nbsp;Кількість населення - 44 756 215 особи. <p>&nbsp;&nbsp;Столиця - м.Київ <p>&nbsp;&nbsp;Державні символи - прапор і герб.<p>&nbsp;&nbsp;Державна мова - українська.<p>&nbsp;&nbsp;Державна валюта - гривня, ₴.'}}/>
                </div>
            </div>
        )
    }
}

export default Info








