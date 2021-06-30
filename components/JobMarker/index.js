import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import MarkerInformation from 'jobs-storybook/component/MarkerInformation';

import { getTimeDifference } from 'utils/TimeFunction';
import { getImageFromS3 } from 'utils/ImageFunction';
import { getDistanceByLatLon } from 'utils/DistanceFunction';

const JobMarker = (props) => {
    const { data } = props;
    let { customAttributes, title, companyDisplayName, addresses, requisitionId, postingPublishTime } = data;
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

    title = title.replace(/[<>]/g, '');
    let jobTags = [];
    let baseSalary = 'Negotiable';
    if (typeof customAttributes !== 'undefined') {
        jobTags = typeof customAttributes.skills !== 'undefined' ? customAttributes.skills.stringValues : [];
        baseSalary =
            typeof customAttributes.baseSalary !== 'undefined'
                ? customAttributes.baseSalary.stringValues
                : 'Negotiable';
    }

    const args = {
        title: title,
        image: getImageFromS3(companyDisplayName),
        badges: jobTags,
        leftSubTitle: baseSalary,
        rightSubTitle: getTimeDifference(new Date(postingPublishTime)),
        address: addresses,
        distance: distance,
    };

    return (
        load && (
            <MarkerInformation
                {...args}
                onClick={() => {
                    Router.push('/jobs/[id]', `/jobs/${requisitionId}`);
                }}
            />
        )
    );
};

export default JobMarker;
