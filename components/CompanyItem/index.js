import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import CompanyTag from 'jobs-storybook/component/CompanyTag';
import CustomButton from 'jobs-storybook/component/CustomButton';

import Share from 'components/Share';
import { getImageFromS3, getCoverFromS3 } from 'utils/ImageFunction';
import { getCountryCodeByName } from 'utils/CountryFunction';
import { getDistanceByLatLon } from 'utils/DistanceFunction';

import ShareIcon from '@material-ui/icons/Share';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import StarRate from '@material-ui/icons/StarRate';

const CompanyItem = (props) => {
    const { data, onClickSkill, onClickLocation, onClickJobs, onClickType, onClickSize } = props;
    const [load, setLoad] = useState(false);
    const [distance, setDistance] = useState();
    useEffect(() => {
        initDistance();
        setLoad(true);
    }, []);

    const initDistance = () => {
        const { lat, lon } = data.location;
        console.log('data.location: ', data.location);
        getDistanceByLatLon(lat, lon, setDistance);
    };

    let { externalId, websiteUri = '', headquartersAddress, size, displayName = '', customAttributes = {} } = data;
    const {
        country = {},
        skills = {},
        specialism = {},
        jobs = {},
        rating = { stringValues: {} },
        socialUri = {},
    } = customAttributes;
    const { code } = getCountryCodeByName(country.stringValues || '');
    const link = websiteUri.indexOf('itviec.com') === -1 ? websiteUri : '';
    const facebookUri = socialUri.stringValues || '';
    const shareURL = `${window.location.origin}/companies/${externalId}`;

    const args = {
        title: displayName,
        image: getCoverFromS3(displayName),
        avatar: getImageFromS3(displayName),
        badges: skills.stringValues || [],
        address: headquartersAddress,
        distance: distance,
        type: specialism.stringValues || 'Outsourcing',
        size: size || 'SMALL',
        country: code,
        job: (jobs.stringValues || 0) + ' Jobs',
        link: '//' + link,
        facebook: facebookUri,
        onClick: () => {
            Router.push('/companies/[id]', `/companies/${externalId}`);
        },
        onClickSkill,
        onClickLocation: () => {
            onClickLocation(headquartersAddress);
        },
        onClickJobs: () => {
            onClickJobs(displayName);
        },
        onClickType: () => {
            onClickType(specialism.stringValues || '');
        },
        onClickSize: () => {
            onClickSize(size);
        },
        buttonList: [
            <CustomButton
                key="1"
                customText={
                    <>
                        {rating.stringValues.ratingStar || 0} &nbsp;
                        <RemoveRedEye />
                        {rating.stringValues.reviewCount || 0} &nbsp;
                        <StarRate />
                    </>
                }
                color="gray"
            />,
            <Share key="2" url={shareURL}>
                <CustomButton icon={<ShareIcon />} text="Share" color="gray" />
            </Share>,
            <CustomButton key="3" type="primary" text="Apply" />,
        ],
    };

    return load && <CompanyTag {...args} />;
};

CompanyItem.defaultProps = {
    onClick: () => {},
    onClickSkill: () => {},
    onClickLocation: () => {},
    onClickJobs: () => {},
    onClickType: () => {},
    onClickSize: () => {},
};
export default CompanyItem;
