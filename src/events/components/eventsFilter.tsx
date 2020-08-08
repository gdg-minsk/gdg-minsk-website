import React, { ReactElement, Dispatch, SetStateAction } from 'react';

import { Box, Hidden } from '@material-ui/core';
import DesktopFilters from '../components/desktop-filters';
import MobileFilters from '../components/mobile-filters';
import { EventFilter } from '../../entities/entities';

const EventsFilter = ({
    filter,
    setFilter,
}: {
    filter: EventFilter;
    setFilter: Dispatch<SetStateAction<v>>;
}): ReactElement => {
    return (
        <Box className="filterWrapper">
            <Hidden xsDown>
                <DesktopFilters filter={filter} setFilter={setFilter} />
            </Hidden>

            <Hidden smUp>
                <MobileFilters filter={filter} setFilter={setFilter} />
            </Hidden>
        </Box>
    );
};

export default EventsFilter;
