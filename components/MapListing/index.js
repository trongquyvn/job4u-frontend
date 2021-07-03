import React, { useState, useEffect, memo } from 'react';
// import dynamic from 'next/dynamic';

import MapSticky from 'components/MapSticky';
import { GridContainer, GridItem } from 'components/Grid';
// import Loading from 'components/Loading';
import CustomGridContainer from 'components/Utils/CustomGridContainer';
import CustomSwitchButton from 'components/Utils/CustomSwitchButton';
import { getCache, setCache } from 'utils/LocalStorage';

import Box from '@material-ui/core/Box';

import classes from './MapListing.module.scss';

// const MapSticky = dynamic(() => import('components/MapSticky'), { loading: () => <Loading /> });
const MapListing = (props) => {
    const { data, renderMap, renderPagination, ItemComponent } = props;
    const [load, setLoad] = useState(false);
    const [map, setMap] = useState(getCache('map-switch-button') === 'true');

    useEffect(() => {
        setLoad(true);
    }, []);

    useEffect(() => {
        if (load) initSwichMap();
    }, [load]);

    const initSwichMap = () => {
        const mapSwitch = document.getElementById('reactive-map-switch');
        if (mapSwitch) {
            mapSwitch.innerHTML = '';
            const mapButton = document.getElementById('map-switch-button');
            mapSwitch.append(mapButton);
        }
    };

    return (
        load && (
            <>
                <div className={classes.mapSwitch}>
                    <CustomSwitchButton
                        id="map-switch-button"
                        title="Map"
                        checked={map}
                        onChange={() => {
                            setCache('map-switch-button', !map);
                            setMap(!map);
                        }}
                    />
                </div>
                <GridContainer spacing={2}>
                    <Box clone order={{ xs: 2, md: 1 }}>
                        <GridItem xs={12} md={map ? 8 : 12}>
                            <CustomGridContainer columns={map ? 2 : 3}>
                                {data.length && ItemComponent ? (
                                    data.map((e, i) => <ItemComponent key={i} data={e} />)
                                ) : (
                                    <div style={{ margin: '0 12px', fontSize: '24px' }}>Empty data</div>
                                )}
                            </CustomGridContainer>
                            {renderPagination()}
                        </GridItem>
                    </Box>
                    {map && (
                        <Box clone order={{ xs: 1, md: 2 }}>
                            <GridItem xs={12} md={4}>
                                <MapSticky>{renderMap()}</MapSticky>
                            </GridItem>
                        </Box>
                    )}
                </GridContainer>
            </>
        )
    );
};

const areEqual = (prevProps, nextProps) => {
    if (nextProps.strId !== prevProps.strId) return false;
    return true;
};

export default memo(MapListing, areEqual);
