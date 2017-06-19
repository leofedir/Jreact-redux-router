import React, { Component } from 'react';
import {connect} from 'react-redux';
import {choroplethLayer} from '../getMapArea.js'
class Info extends Component {
    // isAllData() {
    //     if (choroplethLayer) {
    //         for( let elem of Object.values(choroplethLayer._layers)) {
    //             console.log('elem.options.fillColor >>>', elem.options.fillColor)
    //             if (elem.options.fillColor === '#cccccc') {
    //                 console.log('not correct data');
    //                 break;
    //             }
    //         }
    //     }
    // }
    
    render() {
        const {info, isAllData} = this.props.map_reducer;
        // console.log(choroplethLayer);
        // this.isAllData();
        return (
            <div className="info">
                <div className="item_header">
                    <div className="map_heder_title">Довідка</div>
                </div>
                <div className="item_content">
                    <div className={isAllData ? "not-all-data" : "disabled"}>
                        <p>
                            Данні можуть бути не коректні
                        </p>
                    </div>
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








