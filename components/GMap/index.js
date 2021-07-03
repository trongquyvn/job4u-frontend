import React, { useEffect } from 'react';
import L from 'leaflet';

const GMap = function ({ lat, lng }) {
    // if (window.google) {
    //     const element = document.createElement('div');
    //     const position = { lat, lng };
    //     const map = new window.google.maps.Map(element, {
    //         zoom: 16,
    //         center: position,
    //     });
    //     new window.google.maps.Marker({ position, map });
    //     return (
    //         <div
    //             style={{
    //                 height: '100%',
    //                 width: '100%',
    //                 position: 'relative',
    //                 overflow: 'hidden',
    //             }}
    //             ref={(e) => {
    //                 e && e.appendChild(element.firstChild);
    //             }}
    //         />
    //     );
    // }

    useEffect(() => {
        init()
    }, [])

    const init = () => {
        const mymap = L.map('mapid').setView([lat, lng], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mymap);
        L.marker([lat, lng]).addTo(mymap);
            // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            // .openPopup();
    }

    return <div id="mapid" style={{ width: '100%', height: '100%' }} />;
};

export default GMap;
