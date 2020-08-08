import React, { useCallback, ReactElement, Dispatch, SetStateAction } from 'react';

import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';

import { SpeakerFilter } from '../../entities/entities';
import './desktop-filters.scss';
import FilterDropdown from '../../components/shared/filtering/filterDropDown';

const DesktopFilters = ({
    filter,
    setFilter,
}: {
    filter: SpeakerFilter;
    setFilter: Dispatch<SetStateAction<SpeakerFilter>>;
}): ReactElement => {
    const handleSearchStrChange = useCallback(event => {
        setFilter(filterState => ({ ...filterState, searchStr: event.target.value as string }));
    }, []);

    const handleStreamChange = useCallback(event => {
        const selected = event.target.value as string;
        setFilter(filterState => ({
            ...filterState,
            stream: {
                ...filterState.stream,
                current: filterState.stream.options.find(item => item.value === selected),
            },
        }));
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

                <FilterDropdown
                    value={filter.stream.current.value}
                    onValueChange={handleStreamChange}
                    items={filter.stream.options}
                />
            </Box>
        </Box>
    );
};

export default DesktopFilters;
