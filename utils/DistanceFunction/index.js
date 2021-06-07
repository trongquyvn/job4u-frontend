import getDistance from 'geolib/es/getDistance';
import Geocode from 'react-geocode';
import { numberFormat } from '../NumberFunction';

export const getLatLon = (callBack = () => {}) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            callBack(position.coords.latitude, position.coords.longitude);
        });
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
};

export const getDistanceByLatLon = (lat, lon, callBack = () => {}) => {
    getLatLon((latitude, longitude) => {
        const distance = getDistance({ latitude: lat, longitude: lon }, { latitude, longitude });
        if (distance < 1000) {
            callBack(distance + ' m');
        } else {
            callBack(numberFormat(distance / 1000) + ' km');
        }
    });
};

export const getCurrentLocation = (callBack = () => {}) => {
    Geocode.setApiKey(process.env.NEXT_PUBLIC_GEO_MAPS_API_KEY);
    getLatLon((latitude, longitude) => {
        Geocode.fromLatLng(latitude, longitude).then(
            (response) => {
                const address = response.results[0].formatted_address;
                callBack(address);
            },
            (error) => {
                console.error(error);
            }
        );
    });
};
