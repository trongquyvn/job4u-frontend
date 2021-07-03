import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Router from 'next/router';

import Loading from 'components/Loading';
import ReactiveDataSearch from 'components/Reactive/ReactiveDataSearch';
import ReactiveMultiList from 'components/Reactive/ReactiveMultiList';

import { renderStarList } from 'utils/UIRender';
import { getCache, setCache } from 'utils/LocalStorage';
import { getCurrentLocation } from 'utils/DistanceFunction';

import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const ReactiveMap = dynamic(() => import('components/Reactive/ReactiveMap'), { loading: () => <Loading /> });
const MapListing = dynamic(() => import('components/MapListing'), { loading: () => <Loading /> });
const CompanyItem = dynamic(() => import('components/CompanyItem'), { loading: () => '' });
const CompanyMarker = dynamic(() => import('components/CompanyMarker'), { loading: () => '' });
const ReactiveSort = dynamic(() => import('components/Reactive/ReactiveSort'), { loading: () => '' });
const stars = renderStarList();
const SearchList = (props) => {
    const { setKey } = props;

    return (
        <div style={{ width: '100%' }}>
            <ReactiveDataSearch
                cacheId="companies_searchName"
                id="CategorySearch"
                properties={{
                    componentId: 'searchName',
                    placeholder: 'Enter Company Name',
                    dataField: ['displayName'],
                    categoryField: 'displayName.keyword',
                    icon: <SearchIcon />,
                }}
            />

            <ReactiveDataSearch
                cacheId="companies_searchLocation"
                id="LocationSearch"
                properties={{
                    componentId: 'searchLocation',
                    placeholder: 'Enter Location or City',
                    dataField: ['headquartersAddress'],
                    categoryField: 'headquartersAddress.keyword',
                    icon: (
                        <LocationOnIcon
                            onClick={() => {
                                getCurrentLocation((e) => {
                                    setCache('companies_searchLocation', e);
                                    setKey(Math.random());
                                });
                            }}
                        />
                    ),
                }}
                bottom
            />

            <div xs={12} className="overflow-auto" style={{ display: 'flex', columnGap: '4px' }}>
                <ReactiveMultiList
                    buttonTitle="Skill"
                    cacheId="companies_searchSkill"
                    properties={{
                        componentId: 'searchSkill',
                        dataField: 'customAttributes.skills.stringValues.keyword',
                        sortBy: 'count',
                    }}
                />
                <ReactiveMultiList
                    buttonTitle="Rating"
                    cacheId="companies_searchRating"
                    properties={{
                        componentId: 'searchRating',
                        dataField: 'ra_ratingValue.keyword',
                        sortBy: 'asc',
                        renderItem: (label, count, classes) => (
                            <>
                                {stars[label]}
                                <div className={classes.count}> ({count})</div>
                            </>
                        ),
                        showSearch: false,
                    }}
                    renderActiveTitle={(title) => (title.length ? title.length + '. ' + title[0] + ' Star' : '')}
                />
                <ReactiveMultiList
                    buttonTitle="Size"
                    cacheId="companies_searchSize"
                    properties={{
                        componentId: 'searchSize',
                        dataField: 'size.keyword',
                        sortBy: 'count',
                    }}
                />
                <ReactiveMultiList
                    buttonTitle="Country"
                    cacheId="companies_searchCountry"
                    properties={{
                        componentId: 'searchCountry',
                        dataField: 'customAttributes.country.stringValues.keyword',
                        sortBy: 'count',
                    }}
                />
                <ReactiveMultiList
                    buttonTitle="City"
                    cacheId="companies_searchCity"
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

const Companies = () => {
    const [load, setLoad] = useState();
    const [key, setKey] = useState();
    const [sortTitle, setSortTitle] = useState('asc');

    useEffect(() => {
        init();
    }, []);

    const init = () => {
        if (!getCache('companies_searchLocation')) {
            const myLocation = getCache('my_Location');
            if (!myLocation) {
                getCurrentLocation((e) => {
                    if (e) {
                        setCache('companies_searchLocation', e);
                        setCache('my_Location', e);
                    } else {
                    }
                });
            } else {
                setCache('companies_searchLocation', myLocation);
            }
        }
        setLoad(true);
    };

    const onSortTitle = () => {
        if (sortTitle === 'asc') setSortTitle('desc');
        if (sortTitle === 'desc') setSortTitle('asc');
        setKey(Math.random());
    };

    return load ? (
        <ReactiveMap
            key={key}
            sortQuery={[{ ra_displayName: { order: sortTitle } }]}
            SortComponent={() => (
                <ReactiveSort
                    data={[
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
                        <CompanyItem
                            {...props}
                            onClickSkill={(e) => {
                                setCache('companies_searchSkill', JSON.stringify([e]));
                                setKey(Math.random());
                            }}
                            onClickLocation={(e) => {
                                setCache('companies_searchLocation', e);
                                setKey(Math.random());
                            }}
                            onClickJobs={(e) => {
                                setCache('jobs_searchName', e);
                                Router.push('/jobs');
                            }}
                            // onClickType={(e) => { }}
                            onClickSize={(e) => {
                                setCache('companies_searchSize', JSON.stringify([e]));
                                setKey(Math.random());
                            }}
                        />
                    )}
                />
            )}
            app="companies"
            filedResult={[
                'searchName',
                'searchLocation',
                'searchSkill',
                'searchRating',
                'searchCountry',
                'searchSize',
                'searchCity',
            ]}
            onPopoverClick={(props) => <CompanyMarker data={props} />}
        />
    ) : (
        ''
    );
};

export default Companies;
