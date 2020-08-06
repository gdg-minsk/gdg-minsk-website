import React, { useCallback, ReactElement, Dispatch, useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';

import { ALL_STREAMS } from '../../constants/app';
import { Filter } from '../../entities/entities';
import './desktop-filters.scss';
import FilterDropdown from './filter-menu-items';

const DesktopFilters = ({ setFilter }: { setFilter: Dispatch<Filter> }): ReactElement => {
    const [eventType, setEventType] = useState(ALL_STREAMS);
    const [searchStr, setSearchStr] = useState('');

    const handleSearchStrChange = useCallback(event => {
        setSearchStr(event.target.value as string);
    }, []);

    const handleEventTypeChange = useCallback(event => {
        setEventType(event.target.value as string);
    }, []);

    useEffect(() => {
        setFilter({ searchStr: searchStr, eventType: eventType });
    }, [searchStr, eventType]);

    return (
        <Box className="filterContainer">
            <Box className="searchByNameContainer">
                <InputLabel className="searchItemLabel searchOptionText" htmlFor="searchByNameInput">
                    speaker full name
                </InputLabel>
                <InputBase
                    id="searchByNameInput"
                    className="searchInputWrapper searchOptionText"
                    classes={{ input: 'searchByNameInput' }}
                    placeholder="Type any words to start search"
                    onChange={handleSearchStrChange}
                    value={searchStr}
                    inputProps={{ 'aria-label': 'search by name' }}
                    fullWidth
                />
            </Box>

            <Box display="flex" alignItems="center">
                <InputLabel className="searchItemLabel searchOptionText" htmlFor="searchByStreamSelect">
                    Stream
                </InputLabel>

                <FilterDropdown eventType={eventType} handleEventTypeChange={handleEventTypeChange} />
            </Box>
        </Box>
    );
};

export default DesktopFilters;
