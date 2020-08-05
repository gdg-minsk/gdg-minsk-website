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
    //const [state, dispatch] = useReducer(speakersFilterReducer, INIT_STATE);

    return (
        <Box className="filterWrapper">
            <Hidden xsDown>
                <DesktopFilters setFilter={setFilter} />
            </Hidden>

            <Hidden smUp>
                <MobileFilters />
            </Hidden>
        </Box>
    );
};

export { SpeakersFilter };
