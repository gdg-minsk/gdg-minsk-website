import React, { useCallback, ReactElement, Dispatch, SetStateAction } from 'react';

import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FilterDropdown from '../../components/shared/filtering/filterDropDown';

import { EventFilter } from '../../entities/entities';
import './desktop-filters.scss';

const DesktopFilters = ({
    filter,
    setFilter,
}: {
    filter: EventFilter;
    setFilter: Dispatch<SetStateAction<EventFilter>>;
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

    const handleSpeakerChange = useCallback(event => {
        const selected = event.target.value as string;
        setFilter(filterState => ({
            ...filterState,
            speaker: {
                ...filterState.speaker,
                current: filterState.speaker.options.find(item => item.value === selected),
            },
        }));
    }, []);

    return (
        <Box className="filterContainer">
            <Box className="searchByNameContainer">
                <InputLabel className="searchItemLabel searchOptionText" htmlFor="searchByNameInput">
                    Event name
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

            <Box display="flex" alignItems="center">
                <InputLabel className="searchItemLabel searchOptionText" htmlFor="searchByStreamSelect">
                    Speaker
                </InputLabel>

                <FilterDropdown
                    value={filter.speaker.current.value}
                    onValueChange={handleSpeakerChange}
                    items={filter.speaker.options}
                />
            </Box>
        </Box>
    );
};

export default DesktopFilters;
