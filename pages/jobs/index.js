import React, { useState } from 'react';
import dynamic from 'next/dynamic';

import Loading from 'components/Loading';
import ReactiveCategorySearch from 'components/Reactive/ReactiveCategorySearch';
import ReactiveDynamicRangeSlider from 'components/Reactive/ReactiveDynamicRangeSlider';
import ReactiveSingleRange from 'components/Reactive/ReactiveSingleRange';
import ReactiveMultiList from 'components/Reactive/ReactiveMultiList';
import { GridContainer, GridItem } from 'components/Grid';

import { dateFilter } from 'utils/TimeFunction';
import { setCache } from 'utils/LocalStorage';
import { getCurrentLocation } from 'utils/DistanceFunction';

import WithSearchMobile from 'hoc/WithSearchMobile';

import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const ReactiveMap = dynamic(() => import('components/Reactive/ReactiveMap'), { loading: () => <Loading /> });
const MapListing = dynamic(() => import('components/MapListing'), { loading: () => <Loading /> });
const JobItem = dynamic(() => import('components/JobItem'), { loading: () => '' });
const JobMarker = dynamic(() => import('components/JobMarker'), { loading: () => '' });
const ReactiveSort = dynamic(() => import('components/Reactive/ReactiveSort'), { loading: () => '' });
const SearchList = (props) => {
    const { searchMobile, setKey } = props;

    const WrapperSearch = (props) => {
        return !searchMobile ? props.children : <GridItem {...props}>{props.children}</GridItem>;
    };

    const WrapperSearchContainer = (props) => {
        return !searchMobile ? props.children : <GridContainer {...props}>{props.children}</GridContainer>;
    };

    return (
        <WrapperSearchContainer style={{ rowGap: '8px' }}>
            <WrapperSearch xs={12}>
                <ReactiveCategorySearch
                    cacheId="jobs_searchName"
                    id={searchMobile ? '' : 'CategorySearch'}
                    properties={{
                        componentId: 'searchName',
                        placeholder: 'Enter Job Title & Company Name',
                        dataField: ['title', 'companyDisplayName'],
                        categoryField: 'title.keyword',
                        icon: <SearchIcon />,
                    }}
                />
                <ReactiveCategorySearch
                    cacheId="jobs_searchLocation"
                    id={searchMobile ? '' : 'LocationSearch'}
                    properties={{
                        componentId: 'searchLocation',
                        placeholder: 'Enter Location or City',
                        dataField: ['addresses'],
                        categoryField: 'addresses.keyword',
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
                />
            </WrapperSearch>
            <WrapperSearch xs={12} className="overflow-auto" style={{ display: 'flex', columnGap: '4px' }}>
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
            </WrapperSearch>
        </WrapperSearchContainer>
    );
};

const Jobs = (props) => {
    const { load, searchMobile } = props;
    const [key, setKey] = useState();
    const [sortDate, setSortDate] = useState('desc');
    const [sortTitle, setSortTitle] = useState('asc');

    const onSortDate = () => {
        if (sortDate === 'asc') setSortDate('desc');
        if (sortDate === 'desc') setSortDate('asc');
    };

    const onSortTitle = () => {
        if (sortTitle === 'asc') setSortTitle('desc');
        if (sortTitle === 'desc') setSortTitle('asc');
    };

    return (
        load && (
            <ReactiveMap
                key={key}
                sortQuery={[
                    { promotionValue: { order: 'desc' } },
                    { ra_postingPublishTime: { order: sortDate } },
                    { title: { order: sortTitle } },
                ]}
                SortComponent={() => (
                    <ReactiveSort
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
                SearchComponent={(props) => <SearchList {...props} searchMobile={searchMobile} setKey={setKey} />}
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
                onPopoverClick={(props) => <JobMarker data={props} />}
            />
        )
    );
};

export default WithSearchMobile(Jobs);
