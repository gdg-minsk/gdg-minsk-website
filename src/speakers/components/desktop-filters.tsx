import React, { useCallback } from 'react';
import classNames from 'classnames';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';

import { Streams, ALL_STREAMS } from '../../constants/app';

import { useSpeakersFilterState, useSpeakersFiltersDispatch } from '../contexts/filters';

const useStyles = makeStyles(() => ({
    filterContainer: {
        display: 'flex',
        boxShadow: '5px 5px 20px #D1D1D1',
        borderRadius: '10px',
        margin: '20px 0',
        position: 'sticky',
        top: '70px',
        width: '100%',
        zIndex: '10',
        background: '#fff',
        padding: '15px 20px',
    },
    searchOptionText: {
        fontSize: '14px',
        lineHeight: '16px',
    },
    searchItemLabel: {
        textTransform: 'uppercase',
        color: '#000000',
        marginRight: '10px',
        flexShrink: '0',
    },
    searchByNameContainer: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: '1',
        marginRight: '40px',
    },
    searchInputWrapper: {
        background: '#FFFFFF',
        border: '1px solid #EFEFEF',
        borderRadius: '5px',
    },
    streamSelectInput: {
        padding: '12px 10px',
        minWidth: '150px',
        textTransform: 'uppercase',
    },
    searchByNameInput: {
        padding: '12px 10px',
    },
    dropdownItem: {
        textTransform: 'uppercase',
        fontSize: '14px',
        lineHeight: '16px',
    },
    filterText: {
        fontSize: '14px',
        lineHeight: '16px',
        color: '#6D7278',
    },
    '@media (max-width: 800px)': {
        filterContainer: {
            flexDirection: 'column',
        },
        searchByNameContainer: {
            margin: '0 0 10px 0',
        },
    },
}));

const DesktopFilters = () => {
    const classes = useStyles();

    const { eventType, searchStr } = useSpeakersFilterState();

    const filtersDispatch = useSpeakersFiltersDispatch();

    const handleSearchStrChange = useCallback(event => {
        filtersDispatch({
            type: 'setSearchStr',
            payload: { searchStr: event.target.value },
        });
    }, []);

    const handleEventTypeChange = useCallback(event => {
        filtersDispatch({
            type: 'setEventType',
            payload: { eventType: event.target.value },
        });
    }, []);

    return (
        <Box className={classes.filterContainer}>
            <Box className={classes.searchByNameContainer}>
                <InputLabel
                    className={classNames(classes.searchItemLabel, classes.searchOptionText)}
                    htmlFor="searchByNameInput"
                >
                    speaker full name
                </InputLabel>
                <InputBase
                    id="searchByNameInput"
                    className={classNames(classes.searchInputWrapper, classes.searchOptionText)}
                    classes={{ input: classes.searchByNameInput }}
                    placeholder="Type any words to start search"
                    onChange={handleSearchStrChange}
                    value={searchStr}
                    inputProps={{ 'aria-label': 'search by name' }}
                    fullWidth
                />
            </Box>

            <Box display="flex" alignItems="center">
                <InputLabel
                    className={classNames(classes.searchItemLabel, classes.searchOptionText)}
                    htmlFor="searchByStreamSelect"
                >
                    Stream
                </InputLabel>

                <Select
                    id="searchByStreamSelect"
                    value={eventType}
                    onChange={handleEventTypeChange}
                    input={
                        <InputBase
                            className={classNames(classes.searchInputWrapper, classes.searchOptionText)}
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
        </Box>
    );
};

export default DesktopFilters;
