import React from 'react';

const GMap = function ({ lat, lng }) {
    if (window.google) {
        const element = document.createElement('div');
        const position = { lat, lng };
        const map = new window.google.maps.Map(element, {
            zoom: 16,
            center: position,
        });
        new window.google.maps.Marker({ position, map });
        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                    overflow: 'hidden',
                }}
                ref={(e) => {
                    e && e.appendChild(element.firstChild);
                }}
            />
        );
    }
    return <div />;
};

export default GMap;
