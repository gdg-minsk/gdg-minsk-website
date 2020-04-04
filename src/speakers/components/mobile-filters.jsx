import React, { useState, useCallback } from 'react';
import classNames from 'classnames';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import FilterIcon from '../../../static/svg/filter.svg';

import { ALL_STREAMS, Streams } from '../../constants/app';

import { useSpeakersFiltersDispatch, useSpeakersFilterState } from '../contexts/filters';

const useStyles = makeStyles(() => ({
    filterText: {
        fontSize: '14px',
        lineHeight: '16px',
        color: '#6D7278',
    },

    filtersContainer: {
        boxShadow: '0px -5px 20px #D1D1D1',
        borderRadius: '10px 10px 0px 0px',
        padding: '15px',
    },

    modal: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },

    searchItemLabel: {
        textTransform: 'uppercase',
        color: '#000000',
        fontSize: '14px',
        lineHeight: '16px',
        marginBottom: '5px',
    },
    searchInputWrapper: {
        background: '#FFFFFF',
        border: '1px solid #EFEFEF',
        borderRadius: '7px',
        fontSize: '14px',
        lineHeight: '16px',
    },
    searchByNameInput: {
        padding: '12px 10px',
    },
    streamSelectInput: {
        padding: '12px 10px',
        textTransform: 'uppercase',
    },
    dropdownItem: {
        textTransform: 'uppercase',
        fontSize: '14px',
        lineHeight: '16px',
    },
    applyFiltersBtn: {
        boxShadow: '5px 5px 12px rgba(51, 114, 223, 0.5)',
        fontSize: '18px',
    },
    cancelBtn: {
        color: '#BCBCBC',
        fontSize: '18px',
    },
}));

const MobileFilters = () => {
    const classes = useStyles();

    const filtersDispatch = useSpeakersFiltersDispatch();
    const { eventType: initEventType, searchStr: initSearchStr } = useSpeakersFilterState();

    const [searchStr, setSearchStr] = useState(initSearchStr);
    const [eventType, setEventType] = useState(initEventType);

    const [isFilterSectionVisible, setFilterSectionVisibility] = useState(false);

    const handleFiltersVisibilityChange = useCallback(() => {
        setFilterSectionVisibility(!isFilterSectionVisible);
    }, [isFilterSectionVisible]);

    const resetFilters = useCallback(() => {
        setSearchStr('');
        setEventType(ALL_STREAMS);

        filtersDispatch({
            type: 'reset',
        });
    }, []);

    const handleSearchStrChange = useCallback(event => {
        setSearchStr(event.target.value);
    }, []);

    const handleEventTypeChange = useCallback(event => {
        setEventType(event.target.value);
    }, []);

    const handleApplyFiltersClick = useCallback(() => {
        filtersDispatch({
            type: 'setFilters',
            payload: { eventType, searchStr },
        });

        setFilterSectionVisibility(false);
    }, [eventType, searchStr]);

    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <>
            <Box display="flex" justifyContent="space-between" padding="10px 0">
                <Button classes={{ text: classes.filterText }} onClick={resetFilters}>
                    All speakers
                </Button>

                <Button className={classes.filterText} onClick={handleFiltersVisibilityChange}>
                    <Box width="15px" height="15px" marginRight="10px">
                        <FilterIcon />
                    </Box>
                    Filter
                </Button>
            </Box>

            <SwipeableDrawer
                anchor="bottom"
                open={isFilterSectionVisible}
                onOpen={handleFiltersVisibilityChange}
                onClose={handleFiltersVisibilityChange}
                disableBackdropTransition={!iOS}
                disableDiscovery={iOS}
                classes={{
                    paperAnchorBottom: classes.filtersContainer,
                }}
                ModalProps={{
                    BackdropProps: {
                        classes: {
                            root: classes.modal,
                        },
                    },
                }}
            >
                <Box marginBottom="25px">
                    <InputLabel className={classes.searchItemLabel} htmlFor="searchByNameInput">
                        speaker full name
                    </InputLabel>
                    <InputBase
                        id="searchByNameInput"
                        className={classNames(classes.searchInputWrapper)}
                        classes={{ input: classes.searchByNameInput }}
                        placeholder="Type any words to start search"
                        onChange={handleSearchStrChange}
                        value={searchStr}
                        inputProps={{ 'aria-label': 'search by name' }}
                        fullWidth
                    />
                </Box>
                <Box>
                    <InputLabel className={classes.searchItemLabel} htmlFor="searchByStreamSelect">
                        Stream
                    </InputLabel>

                    <Select
                        id="searchByStreamSelect"
                        value={eventType}
                        onChange={handleEventTypeChange}
                        input={
                            <InputBase
                                className={classes.searchInputWrapper}
                                classes={{ input: classes.streamSelectInput }}
                            />
                        }
                        fullWidth
                    >
                        <MenuItem classes={{ root: classes.dropdownItem }} value={ALL_STREAMS}>
                            All
                        </MenuItem>
                        <MenuItem classes={{ root: classes.dropdownItem }} value={Streams.WEB}>
                            Web Meetup
                        </MenuItem>
                        <MenuItem classes={{ root: classes.dropdownItem }} value={Streams.MOBILE}>
                            Mobile Meetup
                        </MenuItem>
                        <MenuItem classes={{ root: classes.dropdownItem }} value={Streams.CLOUD}>
                            Cloud Meetup
                        </MenuItem>
                    </Select>
                </Box>

                <Box display="flex" justifyContent="space-around" marginTop="40px">
                    <Button
                        classes={{
                            root: classes.applyFiltersBtn,
                        }}
                        variant="contained"
                        color="primary"
                        onClick={handleApplyFiltersClick}
                    >
                        apply filter
                    </Button>
                    <Button
                        classes={{
                            root: classes.cancelBtn,
                        }}
                        onClick={handleFiltersVisibilityChange}
                    >
                        cancel
                    </Button>
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default MobileFilters;
