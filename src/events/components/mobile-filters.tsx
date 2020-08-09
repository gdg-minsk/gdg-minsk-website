import React, { useState, useCallback, Dispatch, ReactElement, SetStateAction } from 'react';
import classNames from 'classnames';

import Box from '@material-ui/core/Box';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import FilterIcon from '../../../static/svg/filter.svg';

import { EventFilter } from '../../entities/entities';
import './mobile-filters.css';
import FilterDropdown from '../../components/shared/filtering/filterDropDown';

const MobileFilters = ({
    filter,
    setFilter,
}: {
    filter: EventFilter;
    setFilter: Dispatch<SetStateAction<EventFilter>>;
}): ReactElement => {
    const [state, setTempState] = useState(filter);

    const handleSearchStrChange = useCallback(event => {
        setTempState(filterState => ({ ...filterState, searchStr: event.target.value as string }));
    }, []);

    const handleStreamChange = useCallback(event => {
        const selected = event.target.value as string;
        setTempState(filterState => ({
            ...filterState,
            stream: {
                ...filterState.stream,
                current: filterState.stream.options.find(item => item.value === selected),
            },
        }));
    }, []);

    const handleSpeakerChange = useCallback(event => {
        const selected = event.target.value as string;
        setTempState(filterState => ({
            ...filterState,
            speaker: {
                ...filterState.speaker,
                current: filterState.speaker.options.find(item => item.value === selected),
            },
        }));
    }, []);

    const [isFilterSectionVisible, setFilterSectionVisibility] = useState(false);

    const handleFiltersVisibilityChange = useCallback(() => {
        setFilterSectionVisibility(!isFilterSectionVisible);
    }, [isFilterSectionVisible]);

    const resetFilters = useCallback(() => {
        setTempState(filter);
    }, []);

    const handleApplyFiltersClick = useCallback(() => {
        setFilter(state);
        setFilterSectionVisibility(false);
    }, [state.searchStr, state.stream.current, state.speaker.current]);

    const iOS = typeof window !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

    return (
        <>
            <Box display="flex" justifyContent="space-between" padding="10px 0">
                <Button classes={{ text: 'filterText' }} onClick={resetFilters}>
                    All events
                </Button>

                <Button className="filterText" onClick={handleFiltersVisibilityChange}>
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
                    <InputLabel className="searchItemLabel" htmlFor="searchByNameInput">
                        speaker full name
                    </InputLabel>
                    <InputBase
                        id="searchByNameInput"
                        className={classNames('searchInputWrapper')}
                        classes={{ input: 'searchByNameInput' }}
                        placeholder="Type any words to start search"
                        onChange={handleSearchStrChange}
                        value={state.searchStr}
                        inputProps={{ 'aria-label': 'search by name' }}
                        fullWidth
                    />
                </Box>
                <Box>
                    <InputLabel className="searchItemLabel" htmlFor="searchByStreamSelect">
                        Stream
                    </InputLabel>

                    <FilterDropdown
                        value={filter.stream.current.value}
                        onValueChange={handleStreamChange}
                        items={filter.stream.options}
                    />
                </Box>
                <Box>
                    <InputLabel className="searchItemLabel" htmlFor="searchByStreamSelect">
                        Speaker
                    </InputLabel>

                    <FilterDropdown
                        value={filter.speaker.current.value}
                        onValueChange={handleSpeakerChange}
                        items={filter.speaker.options}
                    />
                </Box>

                <Box className="buttonBox">
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
