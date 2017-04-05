import React, { Component } from 'react';

import MainMenu from './PageElement/MainMenu';
import Map from './PageElement/Map';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            folder: null,
            item: null
        };
    }

    getBase() {


        let zoomIn = document.getElementById('zoom_in');
        zoomIn.addEventListener('click', function () {
            if (Lmap) {
                Lmap.zoomIn(1)
            }
        })

        let zoomOut = document.getElementById('zoom_out');

        zoomOut.addEventListener('click', function () {
            if (Lmap) {
                Lmap.zoomOut(1)
            }
        });

        let marker = null, circle = null;

        let locate = document.getElementById('geolocate');

        locate.addEventListener('click', () => {
            if (Lmap) {
                Lmap.locate({setView: true})
                Lmap.once('locationfound', function(e) {
                    onLocationFound (e, this)
                });
            }
        });

        function onLocationFound(e, map) {
            if (marker !== null || circle !== null) {
                map.removeLayer(marker);
                map.removeLayer(circle);
                marker = null;
                circle = null;
            } else {
                let radius = e.accuracy / 2;
                marker = L.marker(e.latlng).addTo(map)
                    .bindPopup("Ви знаходитесь в межах " + radius + " метрів від цієї точки").openPopup();
                circle = L.circle(e.latlng, radius).addTo(map);
            }
        }
    }

    componentDidMount() {
        this.getBase();
    }

    render() {
        return (
            <div id="wrapper">
                <MainMenu />
                <Map />
            </div>
        );
    }
}

export default App;
