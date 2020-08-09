import React, { ReactElement, Dispatch, SetStateAction } from 'react';

import { Box, Hidden } from '@material-ui/core';
import DesktopFilters from './desktop-filters';
import MobileFilters from './mobile-filters';
import { SpeakerFilter } from '../../entities/entities';

const SpeakersFilter = ({
    filter,
    setFilter,
}: {
    filter: SpeakerFilter;
    setFilter: Dispatch<SetStateAction<SpeakerFilter>>;
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
