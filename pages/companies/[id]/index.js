import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import { getJobsByCompany } from 'services/Companies';
import { actionGetCompanyDetail } from 'redux/actions/jobCompanyDetailt';
// import GMap from 'components/GMap';
import Loading from 'components/Loading';
import Share from 'components/Share';
import { GridContainer, GridItem } from 'components/Grid';
import JobRecently from 'components/JobRecently';

import { getImageFromS3, getCoverFromS3 } from 'utils/ImageFunction';
import { getDistanceByLatLon } from 'utils/DistanceFunction';

import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import PlaceIcon from '@material-ui/icons/Place';
import ShareIcon from '@material-ui/icons/Share';
import FacebookIcon from '@material-ui/icons/Facebook';
import LaunchIcon from '@material-ui/icons/Launch';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ApartmentIcon from '@material-ui/icons/Apartment';

import CustomButton from 'jobs-storybook/component/CustomButton';
import Badges from 'jobs-storybook/component/Badges';

import classes from './index.module.scss';

const CompanyDetails = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const data = useSelector(({ companiesReducer }) => companiesReducer.companyDetails[id]);
    const [GMap, setGMap] = useState();
    const [distance, setDistance] = useState();
    const [jobs, setJobs] = useState([]);

    const initCompanyDetails = async () => {
        if (!data && id) dispatch(actionGetCompanyDetail(id));
    };

    useEffect(() => {
        const GMap = dynamic(() => import('components/GMap'), { ssr: false });
        setGMap(GMap);
    }, []);

    useEffect(() => {
        initCompanyDetails(id);
    }, [id]);

    useEffect(() => {
        if (data) {
            const { location, externalId } = data;
            getDistanceByLatLon(location.lat, location.lon, setDistance);
            getJobsByCompany(externalId).then((res) => {
                if (res) setJobs(res);
            });
        }
    }, [data]);

    const { externalId, displayName, location, headquartersAddress, customAttributes, size, eeoText, websiteUri = '' } =
        data || {};
    let ratingValue = 1;
    let reviewCount = 0;
    let countryValue = '';
    let jobTags = [];
    let facebookUri = '';
    if (typeof customAttributes !== 'undefined') {
        const {
            rating = { stringValues: {} },
            country = { stringValues: '' },
            skills = { stringValues: [] },
            socialUri = { stringValues: '' },
        } = customAttributes;
        ratingValue = rating.stringValues.ratingValue || 1;
        reviewCount = rating.stringValues.reviewCount || 0;
        countryValue = country.stringValues;
        jobTags = skills.stringValues;
        facebookUri = socialUri.stringValues;
    }

    let shareURL = '';
    if (typeof window !== 'undefined') shareURL = `${window.location.origin}/companies/${externalId}`;
    const link = websiteUri.indexOf('itviec.com') === -1 ? websiteUri : '';
    return data ? (
        <div>
            <GridContainer className={classes.topContent}>
                <Hidden only="xs">
                    <GridItem md={8}>
                        <div
                            className={classes.background}
                            style={{ backgroundImage: `url('${getCoverFromS3(displayName)}')` }}
                        />
                    </GridItem>
                </Hidden>
                <GridItem xs={12} md={4}>
                    {GMap ? <GMap lat={location.lat} lng={location.lon} /> : ''}
                </GridItem>
            </GridContainer>

            <div className={classes.midContent}>
                <div className={classes.avatarContent}>
                    <div
                        className={classes.background + ' ' + classes.avatar}
                        style={{ backgroundImage: `url('${getImageFromS3(displayName)}')` }}
                    />
                    <div className={classes.titleContent}>
                        <div className={classes.title}>{displayName}</div>
                        <div className={classes.textIcon}>
                            <PlaceIcon />
                            <span className={classes.address}>{headquartersAddress}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Box clone p={1}>
                <GridContainer spacing={2}>
                    <GridItem xs={12} md={8} className={classes.listButton}>
                        {facebookUri ? (
                            <CustomButton
                                icon={<FacebookIcon />}
                                color="white"
                                background="pink"
                                text="Facebook"
                                width="120px"
                                hover
                                onClick={() => {
                                    window.open(facebookUri);
                                }}
                            />
                        ) : (
                            ''
                        )}

                        {link ? (
                            <CustomButton
                                icon={<LaunchIcon />}
                                color="white"
                                background="pink"
                                text="Website"
                                width="120px"
                                hover
                                onClick={() => {
                                    window.open('//' + link);
                                }}
                            />
                        ) : (
                            ''
                        )}

                        <Share url={shareURL}>
                            <CustomButton
                                icon={<ShareIcon />}
                                color="white"
                                background="pink"
                                text="Share"
                                width="120px"
                                hover
                            />
                        </Share>
                    </GridItem>
                    <GridItem xs={12} md={4} className={classes.rightInfo}>
                        <GridContainer>
                            <GridItem xs={4}>
                                <div className={classes.optionIcon}>
                                    <RemoveRedEyeIcon />
                                    <span className={classes.address}>{reviewCount}</span>
                                </div>
                            </GridItem>
                            <GridItem xs={4}>
                                <div className={classes.optionIcon}>
                                    <StarBorderIcon />
                                    <span className={classes.address}>{ratingValue}</span>
                                </div>
                            </GridItem>
                            <GridItem xs={4}>
                                <div className={classes.optionIcon}>
                                    <ApartmentIcon />
                                    <span className={classes.address}>{size}</span>
                                </div>
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={4}>
                                <span className={classes.address}>{countryValue}</span>
                            </GridItem>
                            <GridItem xs={4}>
                                <span className={classes.distance}>{distance}</span>
                            </GridItem>
                            <GridItem xs={4}></GridItem>
                        </GridContainer>
                    </GridItem>
                </GridContainer>
            </Box>

            <Box clone p={1}>
                <GridContainer spacing={2}>
                    <GridItem xs={12} md={8}>
                        <div className={classes.gridBorder}>
                            <div className={classes.titleInfo}>About</div>
                            <div dangerouslySetInnerHTML={{ __html: eeoText }}></div>
                            {jobTags.lenth ? (
                                <>
                                    <div className={classes.titleInfo}>Key skills</div>
                                    <Badges data={jobTags} />
                                </>
                            ) : (
                                ''
                            )}
                        </div>
                    </GridItem>
                    <GridItem xs={12} md={4}>
                        <JobRecently data={jobs} />
                    </GridItem>
                </GridContainer>
            </Box>
        </div>
    ) : (
        <Loading />
    );
};

// export async function getStaticPaths() {
//     return {
//         paths: [
//             { params: { id: '100-degrees-entertainment' } },
//         ], fallback: false
//     }
// }

// export async function getStaticProps({ params }) {
//     return {
//         props: {},
//     }
// }

export default CompanyDetails;
