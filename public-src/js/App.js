import React, {Component} from 'react';
import { menu } from './PageElement/menu'
import { checkStatus, parseJSON} from './checkJSON';
import $ from "jquery";

import MainMenu from './PageElement/MainMenu';
import Map from './PageElement/Map';

let wrapper = document.getElementById('wrapper')


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: null,
            item: null,
            showMenu: true,
            category: 'main',
            fields: null
        };
    }

    chengeCategory(e) {
        let url = e.target.dataset.url
        fetch(url, {
            method: 'post',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: `category=${ url }`
        })
            .then(checkStatus)
            .then(parseJSON)
            .then(data => {
                return data.data.map(item => {
                    return item.table_name
                })
            }).then(d => {
            console.log('d >>', d)
            this.setState({
                category: url,
                fields: d
            })
            console.log('this.state >>', this.state)
        })
    }

    getItem(items) {
        return items.map(item => {
            return (
                <li className="menu__item" key={item.key}>
                    <img className="menu__icon" src={'img/menu/' + item.icon}/>
                    <a href="#" onClick={ ::this.chengeCategory } data-url={item.url}>{item.name}</a>
                </li>)
        });
    }

    autoCloseMenu() {
        function removePopups(e) {
            if (!e.target.matches('.menu *') && !e.target.matches('.menu_ico') && !document.getElementById('wrapper').classList.contains('hide') ) {
                document.getElementById('wrapper').classList.toggle('hide')
                window.removeEventListener('click', removePopups);
            }
        };
        window.addEventListener('click', removePopups.bind(this));
    }

    hideMenu() {
        document.getElementById('wrapper').classList.toggle('hide')
    }

    full() {

    }

    componentWillMount() {
        this.autoCloseMenu()
    }

    componentWillUpdate() {
        this.autoCloseMenu()
    }

    render() {
        return (
            <div id="wrapper"
                 className={(this.state.showMenu) ? "" : "hide " }>
                <div id="menu_wrapper" className="menu_wrapper">
                    <div className={`icons-menu`} id="menu">
                        <div className="menu">
                            <ul className="menu__items">
                                {this.getItem(menu)}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="heder">
                    <i className="fa fa-bars fa-2x menu_ico" onClick={::this.hideMenu} id="hide_menu"/>
                    <a className="logo-link" href="/"><img className="logo-link_img" src="./img/Logo.svg" alt=""/></a>
                </div>
                <div className="content__wrap">

                    <div className="main">

                        <Map category={this.state.category} fields={this.state.fields}/>

                        <div className="block block-bottom">
                            <div className="item_header">
                                <div className="map_heder_title">444</div>
                                <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"
                                   onClick={::this.full}/></div>
                            <div className="item_content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultricies lectus ac varius. Mauris orci diam, rutrum a mi eu, dignissim suscipit ante. Aliquam elit lectus, fringilla non scelerisque sit amet, ornare a mauris. Donec ante dolor, condimentum sed lectus nec, interdum euismod turpis. Mauris at egestas diam, id semper nisi. Nam quis massa nisl. Donec bibendum cursus finibus. Vestibulum ut justo nibh. Quisque scelerisque odio eu mattis fringilla. Aenean sit amet laoreet ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit, arcu vel tempus semper, metus urna scelerisque ipsum, id mattis lorem eros eu libero. Donec at semper orci. In interdum et sapien sit amet posuere. Fusce scelerisque dictum neque, et ultricies ligula ullamcorper sit amet.
                                Phasellus ac massa sed nisl porttitor varius. Curabitur diam nisl, lacinia nec lectus at, rhoncus vehicula turpis. Ut bibendum felis ligula. Etiam semper sed nisl ac tempor. Nullam eget porttitor neque, ut laoreet ligula. Duis varius, urna sed congue imperdiet, ipsum mi euismod odio, a rhoncus velit tortor eget tortor. Etiam quis turpis mauris. Ut nibh nisi, convallis ac imperdiet sed, varius in lacus. Cras nec interdum mauris. Vestibulum rhoncus neque non aliquet egestas. Aenean consectetur tristique nulla, a sagittis elit euismod vel. Fusce venenatis, ligula aliquet faucibus dictum, leo lacus tempor nulla, ut mattis tortor quam ac diam. Aenean scelerisque tincidunt orci, sit amet iaculis sem varius id. Sed commodo ut dui non cursus. Nunc pellentesque augue id magna iaculis pulvinar. Morbi aliquet erat nulla, et consectetur dolor posuere vitae.
                                Donec in mattis quam. Fusce placerat lacus volutpat ullamcorper sodales. Praesent sagittis, sem quis facilisis porta, orci odio ultrices sem, tristique egestas urna ipsum sit amet nunc. Curabitur dictum sodales turpis at venenatis. Suspendisse pretium, felis sit amet efficitur sollicitudin, est ante placerat diam, malesuada malesuada elit nulla eget turpis. Pellentesque vitae porttitor lacus. Maecenas commodo elit nibh, non egestas nunc faucibus nec. Suspendisse tristique diam eu vestibulum gravida. Etiam at enim nec est gravida fermentum a eget magna. Ut laoreet consectetur magna, ut scelerisque lectus suscipit non. Phasellus venenatis metus fermentum nunc sodales, id molestie velit blandit. Vestibulum semper, justo et rhoncus efficitur, purus ex feugiat risus, nec consequat odio est sit amet magna.
                            </div>
                        </div>

                    </div>
                    <div className="aside aside-1">
                        <div className="block block-top">
                            <div className="item_header">
                                <div className="map_heder_title">Довідка</div>

                            </div>
                            <div className="item_content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultricies lectus ac varius. Mauris orci diam, rutrum a mi eu, dignissim suscipit ante. Aliquam elit lectus, fringilla non scelerisque sit amet, ornare a mauris. Donec ante dolor, condimentum sed lectus nec, interdum euismod turpis. Mauris at egestas diam, id semper nisi. Nam quis massa nisl. Donec bibendum cursus finibus. Vestibulum ut justo nibh. Quisque scelerisque odio eu mattis fringilla. Aenean sit amet laoreet ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit, arcu vel tempus semper, metus urna scelerisque ipsum, id mattis lorem eros eu libero. Donec at semper orci. In interdum et sapien sit amet posuere. Fusce scelerisque dictum neque, et ultricies ligula ullamcorper sit amet.
                            Phasellus ac massa sed nisl porttitor varius. Curabitur diam nisl, lacinia nec lectus at, rhoncus vehicula turpis. Ut bibendum felis ligula. Etiam semper sed nisl ac tempor. Nullam eget porttitor neque, ut laoreet ligula. Duis varius, urna sed congue imperdiet, ipsum mi euismod odio, a rhoncus velit tortor eget tortor. Etiam quis turpis mauris. Ut nibh nisi, convallis ac imperdiet sed, varius in lacus. Cras nec interdum mauris. Vestibulum rhoncus neque non aliquet egestas. Aenean consectetur tristique nulla, a sagittis elit euismod vel. Fusce venenatis, ligula aliquet faucibus dictum, leo lacus tempor nulla, ut mattis tortor quam ac diam. Aenean scelerisque tincidunt orci, sit amet iaculis sem varius id. Sed commodo ut dui non cursus. Nunc pellentesque augue id magna iaculis pulvinar. Morbi aliquet erat nulla, et consectetur dolor posuere vitae.
                            Donec in mattis quam. Fusce placerat lacus volutpat ullamcorper sodales. Praesent sagittis, sem quis facilisis porta, orci odio ultrices sem, tristique egestas urna ipsum sit amet nunc. Curabitur dictum sodales turpis at venenatis. Suspendisse pretium, felis sit amet efficitur sollicitudin, est ante placerat diam, malesuada malesuada elit nulla eget turpis. Pellentesque vitae porttitor lacus. Maecenas commodo elit nibh, non egestas nunc faucibus nec. Suspendisse tristique diam eu vestibulum gravida. Etiam at enim nec est gravida fermentum a eget magna. Ut laoreet consectetur magna, ut scelerisque lectus suscipit non. Phasellus venenatis metus fermentum nunc sodales, id molestie velit blandit. Vestibulum semper, justo et rhoncus efficitur, purus ex feugiat risus, nec consequat odio est sit amet magna.
                        </div>
                        </div>
                        <div className="block block-bottom">
                            <div className="item_header">
                                <div className="map_heder_title">5555</div>
                                <i className="fa fa-expand fa-1x menu_ico ico_map_full ico_hover"
                                   onClick={::this.full}/>
                            </div>
                            <div className="item_content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultricies lectus ac varius. Mauris orci diam, rutrum a mi eu, dignissim suscipit ante. Aliquam elit lectus, fringilla non scelerisque sit amet, ornare a mauris. Donec ante dolor, condimentum sed lectus nec, interdum euismod turpis. Mauris at egestas diam, id semper nisi. Nam quis massa nisl. Donec bibendum cursus finibus. Vestibulum ut justo nibh. Quisque scelerisque odio eu mattis fringilla. Aenean sit amet laoreet ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit, arcu vel tempus semper, metus urna scelerisque ipsum, id mattis lorem eros eu libero. Donec at semper orci. In interdum et sapien sit amet posuere. Fusce scelerisque dictum neque, et ultricies ligula ullamcorper sit amet.
                                Phasellus ac massa sed nisl porttitor varius. Curabitur diam nisl, lacinia nec lectus at, rhoncus vehicula turpis. Ut bibendum felis ligula. Etiam semper sed nisl ac tempor. Nullam eget porttitor neque, ut laoreet ligula. Duis varius, urna sed congue imperdiet, ipsum mi euismod odio, a rhoncus velit tortor eget tortor. Etiam quis turpis mauris. Ut nibh nisi, convallis ac imperdiet sed, varius in lacus. Cras nec interdum mauris. Vestibulum rhoncus neque non aliquet egestas. Aenean consectetur tristique nulla, a sagittis elit euismod vel. Fusce venenatis, ligula aliquet faucibus dictum, leo lacus tempor nulla, ut mattis tortor quam ac diam. Aenean scelerisque tincidunt orci, sit amet iaculis sem varius id. Sed commodo ut dui non cursus. Nunc pellentesque augue id magna iaculis pulvinar. Morbi aliquet erat nulla, et consectetur dolor posuere vitae.
                                Donec in mattis quam. Fusce placerat lacus volutpat ullamcorper sodales. Praesent sagittis, sem quis facilisis porta, orci odio ultrices sem, tristique egestas urna ipsum sit amet nunc. Curabitur dictum sodales turpis at venenatis. Suspendisse pretium, felis sit amet efficitur sollicitudin, est ante placerat diam, malesuada malesuada elit nulla eget turpis. Pellentesque vitae porttitor lacus. Maecenas commodo elit nibh, non egestas nunc faucibus nec. Suspendisse tristique diam eu vestibulum gravida. Etiam at enim nec est gravida fermentum a eget magna. Ut laoreet consectetur magna, ut scelerisque lectus suscipit non. Phasellus venenatis metus fermentum nunc sodales, id molestie velit blandit. Vestibulum semper, justo et rhoncus efficitur, purus ex feugiat risus, nec consequat odio est sit amet magna.
                            </div>
                        </div>
                    </div>

                    <div className="aside aside-2">
                        <div className="block block-top">
                            <div className="block-top-1">
                                <div className="slider" id="slider"/>
                            </div>


                        <div className="block-top-2">
                            <div className="item_header">
                                <div className="map_heder_title">333</div>
                            </div>
                            <div className="item_content">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultricies lectus ac varius. Mauris orci diam, rutrum a mi eu, dignissim suscipit ante. Aliquam elit lectus, fringilla non scelerisque sit amet, ornare a mauris. Donec ante dolor, condimentum sed lectus nec, interdum euismod turpis. Mauris at egestas diam, id semper nisi. Nam quis massa nisl. Donec bibendum cursus finibus. Vestibulum ut justo nibh. Quisque scelerisque odio eu mattis fringilla. Aenean sit amet laoreet ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit, arcu vel tempus semper, metus urna scelerisque ipsum, id mattis lorem eros eu libero. Donec at semper orci. In interdum et sapien sit amet posuere. Fusce scelerisque dictum neque, et ultricies ligula ullamcorper sit amet.
                                Phasellus ac massa sed nisl porttitor varius. Curabitur diam nisl, lacinia nec lectus at, rhoncus vehicula turpis. Ut bibendum felis ligula. Etiam semper sed nisl ac tempor. Nullam eget porttitor neque, ut laoreet ligula. Duis varius, urna sed congue imperdiet, ipsum mi euismod odio, a rhoncus velit tortor eget tortor. Etiam quis turpis mauris. Ut nibh nisi, convallis ac imperdiet sed, varius in lacus. Cras nec interdum mauris. Vestibulum rhoncus neque non aliquet egestas. Aenean consectetur tristique nulla, a sagittis elit euismod vel. Fusce venenatis, ligula aliquet faucibus dictum, leo lacus tempor nulla, ut mattis tortor quam ac diam. Aenean scelerisque tincidunt orci, sit amet iaculis sem varius id. Sed commodo ut dui non cursus. Nunc pellentesque augue id magna iaculis pulvinar. Morbi aliquet erat nulla, et consectetur dolor posuere vitae.
                                Donec in mattis quam. Fusce placerat lacus volutpat ullamcorper sodales. Praesent sagittis, sem quis facilisis porta, orci odio ultrices sem, tristique egestas urna ipsum sit amet nunc. Curabitur dictum sodales turpis at venenatis. Suspendisse pretium, felis sit amet efficitur sollicitudin, est ante placerat diam, malesuada malesuada elit nulla eget turpis. Pellentesque vitae porttitor lacus. Maecenas commodo elit nibh, non egestas nunc faucibus nec. Suspendisse tristique diam eu vestibulum gravida. Etiam at enim nec est gravida fermentum a eget magna. Ut laoreet consectetur magna, ut scelerisque lectus suscipit non. Phasellus venenatis metus fermentum nunc sodales, id molestie velit blandit. Vestibulum semper, justo et rhoncus efficitur, purus ex feugiat risus, nec consequat odio est sit amet magna.
                            </div>
                        </div>
                        </div>

                    <div className="block block-bottom">
                        <div className="item_header">
                            <div className="map_heder_title">Легенда</div>
                        </div>
                        <div className="item_content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus commodo ultricies lectus ac varius. Mauris orci diam, rutrum a mi eu, dignissim suscipit ante. Aliquam elit lectus, fringilla non scelerisque sit amet, ornare a mauris. Donec ante dolor, condimentum sed lectus nec, interdum euismod turpis. Mauris at egestas diam, id semper nisi. Nam quis massa nisl. Donec bibendum cursus finibus. Vestibulum ut justo nibh. Quisque scelerisque odio eu mattis fringilla. Aenean sit amet laoreet ipsum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent suscipit, arcu vel tempus semper, metus urna scelerisque ipsum, id mattis lorem eros eu libero. Donec at semper orci. In interdum et sapien sit amet posuere. Fusce scelerisque dictum neque, et ultricies ligula ullamcorper sit amet.
                            Phasellus ac massa sed nisl porttitor varius. Curabitur diam nisl, lacinia nec lectus at, rhoncus vehicula turpis. Ut bibendum felis ligula. Etiam semper sed nisl ac tempor. Nullam eget porttitor neque, ut laoreet ligula. Duis varius, urna sed congue imperdiet, ipsum mi euismod odio, a rhoncus velit tortor eget tortor. Etiam quis turpis mauris. Ut nibh nisi, convallis ac imperdiet sed, varius in lacus. Cras nec interdum mauris. Vestibulum rhoncus neque non aliquet egestas. Aenean consectetur tristique nulla, a sagittis elit euismod vel. Fusce venenatis, ligula aliquet faucibus dictum, leo lacus tempor nulla, ut mattis tortor quam ac diam. Aenean scelerisque tincidunt orci, sit amet iaculis sem varius id. Sed commodo ut dui non cursus. Nunc pellentesque augue id magna iaculis pulvinar. Morbi aliquet erat nulla, et consectetur dolor posuere vitae.
                            Donec in mattis quam. Fusce placerat lacus volutpat ullamcorper sodales. Praesent sagittis, sem quis facilisis porta, orci odio ultrices sem, tristique egestas urna ipsum sit amet nunc. Curabitur dictum sodales turpis at venenatis. Suspendisse pretium, felis sit amet efficitur sollicitudin, est ante placerat diam, malesuada malesuada elit nulla eget turpis. Pellentesque vitae porttitor lacus. Maecenas commodo elit nibh, non egestas nunc faucibus nec. Suspendisse tristique diam eu vestibulum gravida. Etiam at enim nec est gravida fermentum a eget magna. Ut laoreet consectetur magna, ut scelerisque lectus suscipit non. Phasellus venenatis metus fermentum nunc sodales, id molestie velit blandit. Vestibulum semper, justo et rhoncus efficitur, purus ex feugiat risus, nec consequat odio est sit amet magna.
                        </div>
                        <div id="legend"/>
                    </div>
                </div>

                </div>
            </div>

        );
    }
}

export default App;
