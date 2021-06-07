import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import JobTag from 'jobs-react/component/JobTag';
import CustomButton from 'jobs-react/component/CustomButton';

import Share from 'components/Share';
import { getTimeDifference } from 'utils/TimeFunction';
import { getImageFromS3 } from 'utils/ImageFunction';
import { getDistanceByLatLon } from 'utils/DistanceFunction';
import { actionGetCompanyDetail } from 'redux/actions';

import ShareIcon from '@material-ui/icons/Share';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import StarRate from '@material-ui/icons/StarRate';

const JobItem = (props) => {
    const { data, onClickSkill, onClickLocation } = props;
    let {
        customAttributes,
        promotionValue,
        title,
        companyDisplayName,
        addresses,
        description,
        requisitionId,
        postingPublishTime,
        companyExternalId,
    } = data;
    const companyInfo = useSelector(({ companiesReducer }) => companiesReducer.companyDetails[companyExternalId]);

    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);
    const [distance, setDistance] = useState();

    useEffect(() => {
        initDistance();
        initCompanyDetails();
        setLoad(true);
    }, []);

    const initDistance = () => {
        const { lat, lon } = data.location;
        getDistanceByLatLon(lat, lon, setDistance);
    };

    const initCompanyDetails = async () => {
        if (!companyInfo) {
            const { companyExternalId } = data;
            dispatch(actionGetCompanyDetail(companyExternalId));
        }
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
    const featureJob = typeof promotionValue !== 'undefined' ? promotionValue : 0;
    addresses = typeof addresses !== 'undefined' ? addresses[0] : '';
    const shareURL = `${window.location.origin}/jobs/${requisitionId}`;

    const { customAttributes: companyCustom = {}, websiteUri = '' } = companyInfo || {};
    const { rating = { stringValues: {} }, socialUri = {} } = companyCustom;
    const link = websiteUri.indexOf('itviec.com') === -1 ? websiteUri : '';
    const facebookUri = socialUri.stringValues || '';
    const args = {
        title: title,
        subTitle: '',
        image: getImageFromS3(companyDisplayName),
        badges: jobTags,
        salary: baseSalary,
        postDate: getTimeDifference(new Date(postingPublishTime)),
        description: description,
        address: addresses,
        distance: distance,
        hot: featureJob,
        link: '//' + link,
        facebook: facebookUri,
        onClick: () => {
            Router.push('/jobs/[id]', `/jobs/${requisitionId}`);
        },
        onClickSkill,
        onClickLocation: () => {
            onClickLocation(addresses);
        },
        buttonList: [
            <CustomButton
                key="1"
                customText={
                    <>
                        {rating.stringValues.reviewCount || 0} &nbsp;
                        <RemoveRedEye />
                        {rating.stringValues.ratingStar || 0} &nbsp;
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
    return load && <JobTag {...args} />;
};

JobItem.defaultProps = {
    onClick: () => {},
    onClickSkill: () => {},
    onClickLocation: () => {},
};
export default JobItem;
