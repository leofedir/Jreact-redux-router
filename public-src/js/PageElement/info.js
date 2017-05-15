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
                         dangerouslySetInnerHTML={info ? {__html: info} : {__html: '&nbsp; &nbsp;Україна - держава у Східній Європі. <p>&nbsp; &nbsp;Площа території - 60 357 712 га.<p>&nbsp; &nbsp;Населення - 44 933 290 особи. <p>&nbsp; &nbsp;Столиця - м.Київ<p>&nbsp; &nbsp;Державна валюта - гривня, ₴.<p><hr>Україна в світових рейтингах:<p>&nbsp; &nbsp;&nbsp; ●&nbsp; 31 місце за чисельністю населення (у 2015 р. за даними ООН);<p>&nbsp; &nbsp;&nbsp; ●&nbsp;46 місце за площею території (у 2017 р. за даними ООН);<p>&nbsp; &nbsp;&nbsp; ●&nbsp;84 місце за Індексом людського розвитку (у 2016 р. за даними ПРООН);<p>&nbsp; &nbsp;&nbsp; ●&nbsp;105 місце за ВВП на душу населення (у 2013 р. за даними Світового банку); <p>&nbsp; &nbsp;&nbsp; ●&nbsp;122 місце за очікуваною тривалістю життя (у 2011 р. за даними «Книги фактів” ЦРУ);   <p>&nbsp; &nbsp;&nbsp; ●&nbsp;132 за індексом щастя населення (у 2017 р. за даними “Інституту Землі” під егідою ООН).'}}/>
                </div>
            </div>
        )
    }
}

export default Info








