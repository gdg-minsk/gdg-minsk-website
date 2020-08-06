import React, { useCallback, ReactElement, Dispatch, SetStateAction } from 'react';

import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';

import { Filter } from '../../entities/entities';
import './desktop-filters.scss';
import FilterDropdown from './filter-menu-items';

const DesktopFilters = ({
    filter,
    setFilter,
}: {
    filter: Filter;
    setFilter: Dispatch<SetStateAction<Filter>>;
}): ReactElement => {
    const handleSearchStrChange = useCallback(event => {
        setFilter(filterState => ({ searchStr: event.target.value as string, eventType: filterState.eventType }));
    }, []);

    const handleEventTypeChange = useCallback(event => {
        setFilter(filterState => ({ searchStr: filterState.searchStr, eventType: event.target.value as string }));
    }, []);
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
                    value={filter.searchStr}
                    inputProps={{ 'aria-label': 'search by name' }}
                    fullWidth
                />
            </Box>

            <Box display="flex" alignItems="center">
                <InputLabel className="searchItemLabel searchOptionText" htmlFor="searchByStreamSelect">
                    Stream
                </InputLabel>

                <FilterDropdown eventType={filter.eventType} handleEventTypeChange={handleEventTypeChange} />
            </Box>
        </Box>
    );
};

export default DesktopFilters;
