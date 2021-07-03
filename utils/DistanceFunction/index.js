import getDistance from 'geolib/es/getDistance';
// import Geocode from 'react-geocode';
import axios from 'axios';
import { numberFormat } from '../NumberFunction';

export const getLatLon = (callBack = () => { }) => {
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
        navigator.geolocation.getCurrentPosition((position) => {
            callBack(position.coords.latitude, position.coords.longitude);
        }, (error) => {
            console.log(error.message);
            callBack(false, false);
        });
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
};

export const getDistanceByLatLon = (lat, lon, callBack = () => { }) => {
    getLatLon((latitude, longitude) => {
        if (latitude && longitude) {
            const distance = getDistance({ latitude: lat, longitude: lon }, { latitude, longitude });
            if (distance < 1000) {
                callBack(distance + ' m');
            } else {
                callBack(numberFormat(distance / 1000) + ' km');
            }
        }
    });
};

export const getCurrentLocation = (callBack = () => { }) => {
    getLatLon((latitude, longitude) => {
        if (latitude && longitude) {
            axios.get(process.env.NEXT_PUBLIC_GEOLOCATION_API)
                .then((res) => {
                    callBack(res.data.state);
                })
        } else {
            callBack(false);
        }
        // Geocode.fromLatLng(latitude, longitude).then(
        //     (response) => {
        //         const address = response.results[0].formatted_address;
        //         callBack(address);
        //     },
        //     (error) => {
        //         console.error(error);
        //     }
        // );
    });
};
