import React, { Component } from 'react';
import {connect} from 'react-redux';

class Info extends Component {

    render() {
        const {info} = this.props.map_reducer;
        
        return (
            <div className="info">
                <div className="item_header">
                    <div className="map_heder_title">Довідка</div>
                </div>
                <div className="item_content">

                    <div id="info"
                         dangerouslySetInnerHTML={info ? {__html: info} : {__html: '<div class="ukraine">Україна</div><div class="info_title">&nbsp;&nbsp;Державні символи</div> <div class="derj_simvol"><div><img class="derj_prapor" src="img/Flag.png"/><p>Прапор</p></div><div><img class="derj_gerb" src="img/Coat.png"/><p>Герб</p></div></div><div class="info_title">Площа території</div> <div class="text_center">60 357 712 га.</div><div class="info_title">Кількість населення </div> <div class="text_center">44 756 215 особи</div><div class="info_small_text">(станом на 01 січня 2017 року)</div> <div class="info_title">Столиця </div><div class="text_center">м.Київ</div> <div class="info_small_text">(50°27′ пн. ш. 30°30′ сх. д.)</div><p><div class="info_title">Державна мова</div> <div class="text_center">українська</div><div class="info_title">Державна валюта </div> <div class="text_center">гривня, ₴</div>'}}/>
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

export default connect(mapStateToProps)(Info);








