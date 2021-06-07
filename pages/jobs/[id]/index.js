import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { getJobRelated } from 'services/Jobs';
import { actionGetJobDetail, actionGetCompanyDetail } from 'redux/actions';

import GMap from 'components/GMap';
import Loading from 'components/Loading';
import Share from 'components/Share';
import { GridContainer, GridItem } from 'components/Grid';
import JobRecently from 'components/JobRecently';

import { getImageFromS3, getCoverFromS3 } from 'utils/ImageFunction';
import { getTimeDifference } from 'utils/TimeFunction';

import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import PlaceIcon from '@material-ui/icons/Place';
import ShareIcon from '@material-ui/icons/Share';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import LaunchIcon from '@material-ui/icons/Launch';
import FacebookIcon from '@material-ui/icons/Facebook';
import MoneyIcon from '@material-ui/icons/Money';
import CodeIcon from '@material-ui/icons/Code';
import AmpStoriesIcon from '@material-ui/icons/AmpStories';
import FlagIcon from '@material-ui/icons/Flag';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

// import moment from 'moment';

import CustomButton from 'jobs-react/component/CustomButton';
import Badges from 'jobs-react/component/Badges';

import classes from './index.module.scss';

const JobDetails = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const data = useSelector(({ jobsReducer }) => jobsReducer.jobDetails[id]);
    const [jobs, setJobs] = useState([]);
    const [companyExternalId, setCompanyExternalId] = useState();
    const companyInfo = useSelector(({ companiesReducer }) => companiesReducer.companyDetails[companyExternalId]);

    const initJobDetails = async () => {
        if (!data && id) dispatch(actionGetJobDetail(id));
    };

    useEffect(() => {
        initJobDetails();
    }, [id]);

    useEffect(() => {
        if (data) {
            const { customAttributes, companyExternalId } = data;
            let skills = [];
            if (typeof customAttributes !== 'undefined') {
                skills = typeof customAttributes.skills !== 'undefined' ? customAttributes.skills.stringValues : [];
            }
            if (skills.length) {
                getJobRelated(skills).then((res) => {
                    if (res) setJobs(res);
                });
            }
            setCompanyExternalId(companyExternalId);
            if (!companyInfo) dispatch(actionGetCompanyDetail(companyExternalId));
        }
    }, [data]);

    const {
        requisitionId,
        companyDisplayName,
        location,
        title,
        addresses,
        incentives,
        description,
        qualifications,
        customAttributes,
        postingPublishTime,
        employmentTypes,
        jobLevel,
    } = data || {};

    let jobTags = [];
    let baseSalary = 'Negotiable';
    let country = '';
    if (typeof customAttributes !== 'undefined') {
        jobTags = typeof customAttributes.skills !== 'undefined' ? customAttributes.skills.stringValues : [];
        baseSalary =
            typeof customAttributes.baseSalary !== 'undefined'
                ? customAttributes.baseSalary.stringValues
                : 'Negotiable';
        country = typeof customAttributes.country !== 'undefined' ? customAttributes.country.stringValues : [];
    }

    let shareURL = '';
    if (typeof window !== 'undefined') shareURL = `${window.location.origin}/jobs/${requisitionId}`;

    const { customAttributes: companyCustom = {}, websiteUri = '' } = companyInfo || {};
    const { socialUri = {} } = companyCustom;
    const link = websiteUri.indexOf('itviec.com') === -1 ? websiteUri : '';
    const facebookUri = socialUri.stringValues || '';

    return data ? (
        <div>
            <GridContainer className={classes.topContent}>
                <Hidden only="xs">
                    <GridItem md={8}>
                        <div
                            className={classes.background}
                            style={{ backgroundImage: `url('${getCoverFromS3(companyDisplayName)}')` }}
                        />
                    </GridItem>
                </Hidden>
                <GridItem xs={12} md={4}>
                    <GMap lat={location.lat} lng={location.lon} />
                </GridItem>
            </GridContainer>
            <GridContainer className={classes.midContent}>
                <GridItem xs={12}>
                    <div
                        className={classes.background + ' ' + classes.avatar}
                        style={{ backgroundImage: `url('${getImageFromS3(companyDisplayName)}')` }}
                    />
                </GridItem>

                <GridContainer>
                    <GridItem xs={12} md={8}>
                        <div className={classes.title}>{title}</div>
                        <div className={classes.subTitle}>{companyDisplayName}</div>
                        <div className={classes.textIcon}>
                            <PlaceIcon />
                            <span className={classes.address}>{addresses[0]}</span>
                        </div>
                    </GridItem>
                    <Box clone order={{ xs: 2, md: 1 }}>
                        <GridItem xs={12} md={4} className={classes.rightInfo}>
                            <div className={classes.address + ' primary-color'}>{baseSalary}</div>
                            <div className={classes.address + ' danger-color'}>
                                {getTimeDifference(new Date(postingPublishTime))}
                            </div>
                            <div>
                                {facebookUri ? (
                                    <a href={facebookUri} target="_blank">
                                        <FacebookIcon />
                                    </a>
                                ) : (
                                    ''
                                )}
                                {link ? (
                                    <a href={'//' + link} target="_blank">
                                        <LaunchIcon />
                                    </a>
                                ) : (
                                    ''
                                )}
                            </div>
                        </GridItem>
                    </Box>
                    <Box clone order={{ xs: 1, md: 2 }}>
                        <GridItem xs={12} className={classes.listButton}>
                            <CustomButton icon={<SkipNextIcon />} type="primary" text="Apply" width="120px" hover />
                            <Share url={shareURL}>
                                <CustomButton icon={<ShareIcon />} type="primary" text="Share" width="120px" hover />
                            </Share>
                            <CustomButton icon={<FavoriteBorderIcon />} text="0" width="60px" />
                        </GridItem>
                    </Box>
                </GridContainer>
            </GridContainer>

            <Box clone p={1}>
                <GridContainer spacing={2}>
                    <GridItem xs={12} md={8}>
                        <div className={classes.gridBorder}>
                            <div className={classes.titleInfo}>Top 3 Reasons To Join Us</div>
                            <div dangerouslySetInnerHTML={{ __html: incentives }}></div>

                            <div className={classes.titleInfo}>About</div>
                            <div dangerouslySetInnerHTML={{ __html: description }}></div>

                            {jobTags.lenth ? (
                                <>
                                    <div className={classes.titleInfo}>Qualifications</div>
                                    <Badges data={jobTags} />
                                </>
                            ) : (
                                ''
                            )}

                            <div className={classes.titleInfo}>Additional Information</div>
                            <div dangerouslySetInnerHTML={{ __html: qualifications }}></div>
                        </div>
                    </GridItem>
                    <GridItem xs={12} md={4}>
                        <div className={classes.gridBorder}>
                            <div className={classes.titleInfo}>Job Overview</div>
                            <div className={classes.textIconRight}>
                                <MoneyIcon />
                                <div>
                                    <div className={classes.overview}>Offered Salary</div>
                                    <div className={classes.address}>{baseSalary}</div>
                                </div>
                            </div>
                            <div className={classes.textIconRight}>
                                <AmpStoriesIcon />
                                <div>
                                    <div className={classes.overview}>Employment Types</div>
                                    <div className={classes.address}>{employmentTypes[0]}</div>
                                </div>
                            </div>
                            <div className={classes.textIconRight}>
                                <SupervisorAccountIcon />
                                <div>
                                    <div className={classes.overview}>Job Level</div>
                                    <div className={classes.address}>{jobLevel}</div>
                                </div>
                            </div>
                            <div className={classes.textIconRight}>
                                <CodeIcon />
                                <div>
                                    <div className={classes.overview}>Skills</div>
                                    <div className={classes.address}>{jobTags.join(', ')}</div>
                                </div>
                            </div>
                            <div className={classes.textIconRight}>
                                <FlagIcon />
                                <div>
                                    <div className={classes.overview}>Country</div>
                                    <div className={classes.address}>{country[0]}</div>
                                </div>
                            </div>
                        </div>
                        <JobRecently className={classes.jobRecently} data={jobs} />
                    </GridItem>
                </GridContainer>
            </Box>
        </div>
    ) : (
        <Loading />
    );
};

export default JobDetails;
