import React, { ReactElement } from 'react';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';

import Map from '../components/shared/map';

const useStyles = makeStyles(() => ({
    map: {
        width: '100%',
        height: '500px',
        position: 'relative',
        marginBottom: 30,
    },
}));

const EventPage = (): ReactElement => {
    const classes = useStyles();

    return (
        <Layout>
            <SEO title="Event" />

            <Box className={classes.map}>
                <Map />
            </Box>
        </Layout>
    );
};

export default EventPage;
