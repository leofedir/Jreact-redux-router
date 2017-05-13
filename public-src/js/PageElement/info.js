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
                         dangerouslySetInnerHTML={info ? {__html: info} : {__html: '&nbsp; &nbsp;Україна - держава у Східній Європі. <p>&nbsp; &nbsp;Площа території - 60 357 712 га.<p>&nbsp; &nbsp;Населення - 44 933 290 особи. <p>&nbsp; &nbsp;Столиця - м.Київ<p>&nbsp; &nbsp;Державна валюта - гривня, ₴.<p><hr>Україна в світових рейтингах (2016 р.):<p>&nbsp; &nbsp;&nbsp; ●&nbsp;31 місце за чисельністю населення;<p>&nbsp; &nbsp;&nbsp; ●&nbsp;46 місце за площею території;<p>&nbsp; &nbsp;&nbsp; ●&nbsp;84 місце за ІЛР;<p>&nbsp; &nbsp;&nbsp; ●&nbsp;105 місце за ВВП на особу; <p>&nbsp; &nbsp;&nbsp; ●&nbsp;122 місце за тривалістю життя;   <p>&nbsp; &nbsp;&nbsp; ●&nbsp;132 за індексом щастя населення.'}}/>
                </div>
            </div>
        )
    }
}

export default Info








