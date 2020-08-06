import React, { ReactElement, Dispatch, SetStateAction } from 'react';

import { Box, Hidden } from '@material-ui/core';
import DesktopFilters from '../components/desktop-filters';
import MobileFilters from '../components/mobile-filters';
import { Filter } from '../../entities/entities';

const SpeakersFilter = ({
    filter,
    setFilter,
}: {
    filter: Filter;
    setFilter: Dispatch<SetStateAction<Filter>>;
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

export { SpeakersFilter };
