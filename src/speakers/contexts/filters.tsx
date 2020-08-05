import React, { useReducer, ReactElement, Dispatch, SetStateAction } from 'react';

import { ALL_STREAMS } from '../../constants/app';
import { Box, Hidden } from '@material-ui/core';
import DesktopFilters from '../components/desktop-filters';
import MobileFilters from '../components/mobile-filters';

interface Filter {
    eventType: string;
    searchStr: string;
}

const SpeakersFilter = ({setFilter }: {setFilter: Dispatch<Filter> }): ReactElement => {
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
