import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import MarkerInformation from 'jobs-storybook/component/MarkerInformation';

import { getCoverFromS3 } from 'utils/ImageFunction';
import { getDistanceByLatLon } from 'utils/DistanceFunction';

const CompanyItem = (props) => {
    const { data } = props;
    const [load, setLoad] = useState(false);
    const [distance, setDistance] = useState();
    useEffect(() => {
        initDistance();
        setLoad(true);
    }, []);

    const initDistance = () => {
        const { lat, lng } = data.location;
        getDistanceByLatLon(lat, lng, setDistance);
    };

    let { externalId, headquartersAddress, displayName = '', customAttributes = {} } = data;
    const { skills = {}, specialism = {}, jobs = {} } = customAttributes;

    const args = {
        title: displayName,
        image: getCoverFromS3(displayName),
        badges: skills.stringValues || [],
        leftSubTitle: (jobs.stringValues || 0) + ' Jobs',
        rightSubTitle: specialism.stringValues || 'Outsource',
        address: headquartersAddress,
        distance: distance,
    };

    return (
        load && (
            <MarkerInformation
                {...args}
                onClick={() => {
                    Router.push('/companies/[id]', `/companies/${externalId}`);
                }}
            />
        )
    );
};

export default CompanyItem;
