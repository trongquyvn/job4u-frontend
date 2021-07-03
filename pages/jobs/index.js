import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

import Loading from 'components/Loading';
import ReactiveDataSearch from 'components/Reactive/ReactiveDataSearch';
import ReactiveDynamicRangeSlider from 'components/Reactive/ReactiveDynamicRangeSlider';
import ReactiveSingleRange from 'components/Reactive/ReactiveSingleRange';
import ReactiveMultiList from 'components/Reactive/ReactiveMultiList';

import { dateFilter } from 'utils/TimeFunction';
import { getCache, setCache } from 'utils/LocalStorage';
import { getCurrentLocation } from 'utils/DistanceFunction';

import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const ReactiveMap = dynamic(() => import('components/Reactive/ReactiveMap'), { loading: () => <Loading /> });
const MapListing = dynamic(() => import('components/MapListing'), { loading: () => <Loading /> });
const JobItem = dynamic(() => import('components/JobItem'), { loading: () => '' });
const JobMarker = dynamic(() => import('components/JobMarker'), { loading: () => '' });
const ReactiveSort = dynamic(() => import('components/Reactive/ReactiveSort'), { loading: () => '' });
const SearchList = (props) => {
    const { setKey } = props;
    return (
        <div style={{ width: '100%' }}>
            <ReactiveDataSearch
                cacheId="jobs_searchName"
                id="CategorySearch"
                properties={{
                    componentId: 'searchName',
                    placeholder: 'Enter Job Title & Company Name',
                    dataField: ['title'],
                    categoryField: 'title',
                    icon: <SearchIcon />,
                }}
            />

            <ReactiveDataSearch
                cacheId="jobs_searchLocation"
                id="LocationSearch"
                properties={{
                    componentId: 'searchLocation',
                    placeholder: 'Enter Location or City',
                    dataField: ['addresses'],
                    categoryField: 'addresses',
                    icon: (
                        <LocationOnIcon
                            onClick={() => {
                                getCurrentLocation((e) => {
                                    setCache('jobs_searchLocation', e);
                                    setKey(Math.random());
                                });
                            }}
                        />
                    ),
                }}
                bottom
            />

            <div className="overflow-auto" style={{ display: 'flex', columnGap: '4px' }}>
                <ReactiveMultiList
                    buttonTitle="Skill"
                    cacheId="jobs_searchSkill"
                    properties={{
                        componentId: 'searchSkill',
                        dataField: 'customAttributes.skills.stringValues.keyword',
                        sortBy: 'count',
                    }}
                />
                <ReactiveSingleRange
                    buttonTitle="Date"
                    cacheId="jobs_searchDate"
                    properties={{
                        componentId: 'searchDate',
                        dataField: 'ra_postingPublishTime',
                        data: dateFilter(),
                    }}
                />
                <ReactiveDynamicRangeSlider
                    buttonTitle="Salary"
                    cacheId="jobs_searchSalary"
                    properties={{
                        componentId: 'searchSalary',
                        dataField: 'ra_salary',
                    }}
                    disabled
                />
                <ReactiveMultiList
                    buttonTitle="Country"
                    cacheId="jobs_searchCountry"
                    properties={{
                        componentId: 'searchCountry',
                        dataField: 'customAttributes.country.stringValues.keyword',
                        sortBy: 'count',
                    }}
                />
                <ReactiveMultiList
                    buttonTitle="City"
                    cacheId="jobs_searchCity"
                    properties={{
                        componentId: 'searchCity',
                        dataField: 'administrativeArea.keyword',
                        sortBy: 'count',
                    }}
                />
            </div>
        </div>
    );
};

const Jobs = () => {
    const [load, setLoad] = useState();
    const [key, setKey] = useState();
    const [hot, setHot] = useState(true);
    const [sortDate, setSortDate] = useState('desc');
    const [sortTitle, setSortTitle] = useState('asc');

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        if (!getCache('jobs_searchLocation')) {
            const myLocation = getCache('my_Location');
            if (!myLocation) {
                getCurrentLocation((e) => {
                    if (e) {
                        setCache('jobs_searchLocation', e);
                        setCache('my_Location', e);
                    } else {
                    }
                });
            } else {
                setCache('jobs_searchLocation', myLocation);
            }
        }
        setLoad(true);
    };

    const onSortDate = () => {
        if (sortDate === 'asc') setSortDate('desc');
        if (sortDate === 'desc') setSortDate('asc');
        setKey(Math.random());
    };

    const onSortTitle = () => {
        if (sortTitle === 'asc') setSortTitle('desc');
        if (sortTitle === 'desc') setSortTitle('asc');
        setKey(Math.random());
    };

    const onHotJobs = () => {
        setHot(!hot);
        setKey(Math.random());
    };

    return load ? (
        <ReactiveMap
            key={key}
            sortQuery={[
                ...(hot ? [{ promotionValue: { order: 'desc' } }] : []),
                { ra_postingPublishTime: { order: sortDate } },
                { title: { order: sortTitle } },
            ]}
            SortComponent={() => (
                <ReactiveSort
                    hotJob={{
                        active: hot,
                        onClick: onHotJobs,
                    }}
                    data={[
                        {
                            name: 'Date',
                            value: sortDate,
                            onClick: onSortDate,
                        },
                        {
                            name: 'Title',
                            value: sortTitle,
                            onClick: onSortTitle,
                        },
                    ]}
                />
            )}
            SearchComponent={() => <SearchList setKey={setKey} />}
            List={(props) => (
                <MapListing
                    {...props}
                    ItemComponent={(props) => (
                        <JobItem
                            {...props}
                            onClickSkill={(e) => {
                                setCache('jobs_searchSkill', JSON.stringify([e]));
                                setKey(Math.random());
                            }}
                            onClickLocation={(e) => {
                                setCache('jobs_searchLocation', e);
                                setKey(Math.random());
                            }}
                        />
                    )}
                />
            )}
            app="jobs"
            filedResult={[
                'searchName',
                'searchLocation',
                'searchDate',
                'searchSalary',
                'searchSkill',
                'searchCountry',
                'searchCity',
            ]}
            onPopoverClick={(props) => {
                return <JobMarker data={props} />;
            }}
        />
    ) : (
        ''
    );
};

export default Jobs;
