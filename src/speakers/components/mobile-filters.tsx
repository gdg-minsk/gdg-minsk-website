import React, { useState, useCallback, Dispatch, ReactElement } from 'react';
import classNames from 'classnames';

import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import FilterIcon from '../../../static/svg/filter.svg';

import { ALL_STREAMS, Streams } from '../../constants/app';

import { Filter } from '../../entities/entities';
import './mobile-filters.css';

const MobileFilters = ({ setFilter }: { setFilter: Dispatch<Filter> }): ReactElement => {
    const [eventType, setEventType] = useState(ALL_STREAMS);
    const [searchStr, setSearchStr] = useState('');

    const handleSearchStrChange = useCallback(event => {
        setSearchStr(event.target.value as string);
    }, []);

    const handleEventTypeChange = useCallback(event => {
        setEventType(event.target.value as string);
    }, []);

    const [isFilterSectionVisible, setFilterSectionVisibility] = useState(false);

    const handleFiltersVisibilityChange = useCallback(() => {
        setFilterSectionVisibility(!isFilterSectionVisible);
    }, [isFilterSectionVisible]);

    const resetFilters = useCallback(() => {
        setSearchStr('');
        setEventType(ALL_STREAMS);
    }, []);

    const handleApplyFiltersClick = useCallback(() => {
        setFilter({ searchStr: searchStr, eventType: eventType });

        setFilterSectionVisibility(false);
    }, [eventType, searchStr]);

    const iOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <>
            <Box display="flex" justifyContent="space-between" padding="10px 0">
                <Button classes={{ text: 'filterText' }} onClick={resetFilters}>
                    All speakers
                </Button>

                <Button className='filterText' onClick={handleFiltersVisibilityChange}>
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
                    paperAnchorBottom: 'filtersContainer',
                }}
                ModalProps={{
                    BackdropProps: {
                        classes: {
                            root: 'modal',
                        },
                    },
                }}
            >
                <Box marginBottom="25px">
                    <InputLabel className='searchItemLabel' htmlFor="searchByNameInput">
                        speaker full name
                    </InputLabel>
                    <InputBase
                        id="searchByNameInput"
                        className={classNames('searchInputWrapper')}
                        classes={{ input: 'searchByNameInput' }}
                        placeholder="Type any words to start search"
                        onChange={handleSearchStrChange}
                        value={searchStr}
                        inputProps={{ 'aria-label': 'search by name' }}
                        fullWidth
                    />
                </Box>
                <Box>
                    <InputLabel className='searchItemLabel' htmlFor="searchByStreamSelect">
                        Stream
                    </InputLabel>

                    <Select
                        id="searchByStreamSelect"
                        value={eventType}
                        onChange={handleEventTypeChange}
                        input={
                            <InputBase
                                className='searchInputWrapper'
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

                <Box display="flex" justifyContent="space-around" marginTop="40px">
                    <Button
                        classes={{
                            root: 'applyFiltersBtn',
                        }}
                        variant="contained"
                        color="primary"
                        onClick={handleApplyFiltersClick}
                    >
                        apply filter
                    </Button>
                    <Button
                        classes={{
                            root: 'cancelBtn',
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
