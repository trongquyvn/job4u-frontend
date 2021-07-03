import dynamic from 'next/dynamic';

// import ReactiveGoogleMap from '@appbaseio/reactivemaps/lib/components/result/ReactiveGoogleMap';
import ReactiveOpenStreetMap from '@appbaseio/reactivemaps/lib/components/result/ReactiveOpenStreetMap';
import ReactiveBase from '@appbaseio/reactivesearch/lib/components/basic/ReactiveBase';

import Loading from 'components/Loading';
import { GridContainer, GridItem } from 'components/Grid';
import { numberFormat } from 'utils/NumberFunction';

import classes from './ReactiveMap.module.scss';

const SelectedFiltersDynamic = dynamic(() => import('@appbaseio/reactivesearch/lib/components/basic/SelectedFilters'), {
    loading: () => <Loading />,
});
const ReactiveListDynamic = dynamic(() => import('@appbaseio/reactivesearch/lib/components/result/ReactiveList'), {
    loading: () => <Loading />,
});

const SelectedFiltersComponent = () => (
    <div className={classes.selectedFilter}>
        <SelectedFiltersDynamic
            render={(props) => {
                const { selectedValues, componentProps, setValue } = props;
                const clearFilter = (component) => {
                    setValue(component, null);
                };
                const keys = Object.keys(selectedValues);
                const clearAll = () => {
                    keys.forEach((component) => {
                        setValue(component, null);
                    });
                };
                const filters = [];
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    const component = JSON.parse(JSON.stringify(selectedValues[key]));
                    let value = component.value;
                    let title = '';
                    if (value) {
                        switch (component.componentType) {
                            case 'DYNAMICRANGESLIDER':
                                const main = componentProps[key];
                                const range = main.range;
                                if (value && value.length && (value[0] !== range.start || value[1] !== range.end)) {
                                    title = value[0] + ' - ' + value[1];
                                }
                                break;
                            case 'SINGLERANGE':
                                if (value.label !== 'All') title = value.label;
                                break;
                            case 'DATASEARCH':
                            case 'CATEGORYSEARCH':
                                break;
                            default:
                                if (value.length) {
                                    title = value.join(', ');
                                    if (component.label === 'searchRating') {
                                        title = title + ' Star';
                                    }
                                }
                        }

                        if (title) {
                            filters.push(
                                <div key={i} className={classes.selectedTab} onClick={() => clearFilter(key)}>
                                    <div className={classes.selectedName}>
                                        {key.replace('search', '')}
                                        {': '}
                                        {title}
                                    </div>
                                    <div className={classes.selectedClose}>✕</div>
                                </div>
                            );
                        }
                    }
                }

                if (filters.length) {
                    filters.push(
                        <div key="all" className={classes.selectedTab} onClick={() => clearAll()}>
                            <div className={classes.selectedClear}>Clear All</div>
                        </div>
                    );
                }
                return filters;
            }}
        />
    </div>
);

const dataToStrId = (data) => {
    let str = '';
    data.forEach((e) => {
        str += e._id;
    });
    return str;
};

const ReactiveMap = (props) => {
    const { List, filedResult, onPopoverClick, app, size, SearchComponent, SortComponent, sortQuery, key = 1 } = props;

    const mapProps = {
        componentId: 'map' + app,
        dataField: 'location',
        defaultZoom: 12,
        showMarkerClusters: false,
        showSearchAsMove: false,
        searchAsMove: false,
        autoClosePopover: true,
        size,
        react: { and: filedResult },
        pagination: true,
        onPopoverClick,
        loader: <div style={{ margin: '0 12px', fontSize: '24px' }}>Loading...</div>,
        style: { width: '100%', height: '100%' },
        renderAllData: (hits, streamHits, loadMore, renderMap, renderPagination) => {
            return (
                <>
                    <SelectedFiltersComponent />
                    <List
                        data={hits}
                        strId={dataToStrId(hits)}
                        renderMap={renderMap}
                        renderPagination={renderPagination}
                    />
                </>
            );
        },
    };

    if (sortQuery) {
        mapProps.defaultQuery = () => ({
            sort: sortQuery,
        });
    }

    return (
        <ReactiveBase
            app={app}
            url={process.env.NEXT_PUBLIC_ELASTICSEARCH_SERVER}
            mapKey={process.env.NEXT_PUBLIC_GEO_MAPS_API_KEY}
            className={classes.reactiveBase}
            key={key}
        >
            <GridContainer className={classes.filterContainer}>
                <GridItem xs={12} sm={12} md={6} className={classes.filters}>
                    {SearchComponent ? <SearchComponent /> : ''}
                </GridItem>
                <GridItem xs={3} sm={6} md={3} className={classes.totalWrapper}>
                    <ReactiveListDynamic
                        componentId="count-result"
                        dataField=""
                        loader=" "
                        react={{ and: filedResult }}
                        renderNoResults={() => ''}
                        showResultStats={true}
                        renderResultStats={(stats) => {
                            const total = numberFormat(stats.numberOfResults, 0);
                            const s = ' ' + app;
                            return (
                                <span className={classes.total}>
                                    {total}
                                    {s}
                                </span>
                            );
                        }}
                        render={() => ''}
                    />
                </GridItem>
                <GridItem xs={9} sm={6} md={3} className={classes.sortWrapper}>
                    {SortComponent ? <SortComponent /> : ''}
                    <div id="reactive-map-switch"></div>
                </GridItem>
            </GridContainer>
            <ReactiveOpenStreetMap componentId={`googleMap ${app}`} {...mapProps} />
        </ReactiveBase>
    );
};

ReactiveMap.defaultProps = {
    filedResult: [],
    onPopoverClick: () => { },
    size: 12,
    app: 'jobs',
};

export default ReactiveMap;
