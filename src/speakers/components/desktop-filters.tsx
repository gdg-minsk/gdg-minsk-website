import React, { useCallback, ReactElement, Dispatch, useState, useEffect } from 'react';

import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';

import { Streams, ALL_STREAMS } from '../../constants/app';
import { Filter } from '../../entities/entities';
import './desktop-filters.scss';

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

                <Select
                    id="searchByStreamSelect"
                    value={eventType}
                    onChange={handleEventTypeChange}
                    input={
                        <InputBase
                            className="searchInputWrapper searchOptionText"
                            classes={{ input: 'streamSelectInput' }}
                        />
                    }
                    fullWidth
                >
                    <MenuItem classes={{ root: 'dropdownItem' }} value={ALL_STREAMS}>
                        All
                    </MenuItem>
                    <MenuItem classes={{ root: 'dropdownItem' }} value={Streams.WEB}>
                        Web Meetup
                    </MenuItem>
                    <MenuItem classes={{ root: 'dropdownItem' }} value={Streams.MOBILE}>
                        Mobile Meetup
                    </MenuItem>
                    <MenuItem classes={{ root: 'dropdownItem' }} value={Streams.CLOUD}>
                        Cloud Meetup
                    </MenuItem>
                </Select>
            </Box>
        </Box>
    );
};

export default DesktopFilters;
