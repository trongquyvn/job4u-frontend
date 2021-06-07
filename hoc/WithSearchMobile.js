import React, { useState, useEffect } from 'react';
import { windowScreen } from 'utils/Devices';

const mediumScreen = 960;
const WithSearchMobile = (Component) => (props) => {
    const [load, setLoad] = useState(false);
    const [searchMobile, setSearchMobile] = useState(false);

    useEffect(() => {
        if (windowScreen < mediumScreen) {
            setSearchMobile(true);
        }
        setLoad(true);
    }, []);

    return <Component {...props} load={load} searchMobile={searchMobile} />;
};

export default WithSearchMobile;
