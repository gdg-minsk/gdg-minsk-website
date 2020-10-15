import React, { ReactElement } from 'react';

import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import { CommunityEvent } from '../entities/entities';



const EventPage = ({communityEvent}): ReactElement => {
    return (
        <Layout>
            <SEO title="Event" />

            <Box>
            </Box>
        </Layout>
    );
};

export default EventPage;
