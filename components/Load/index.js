import { useState, useEffect } from 'react';

const Load = (props) => {
    const { children } = props;
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);
    }, []);

    return load && children;
};

export default Load;
