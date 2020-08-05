import React, { ReactElement, Dispatch } from 'react';

import { Box, Hidden } from '@material-ui/core';
import DesktopFilters from '../components/desktop-filters';
import MobileFilters from '../components/mobile-filters';
import { Filter } from '../../entities/entities';

const SpeakersFilter = ({ setFilter }: { setFilter: Dispatch<Filter> }): ReactElement => {
    return (
        <Box className="filterWrapper">
            <Hidden xsDown>
                <DesktopFilters setFilter={setFilter} />
            </Hidden>

            <Hidden smUp>
                <MobileFilters setFilter={setFilter} />
            </Hidden>
        </Box>
    );
};

export { SpeakersFilter };
