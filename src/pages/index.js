import React from 'react';
import { Link } from 'gatsby';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

import Layout from '../components/layout';
import Image from '../components/image';
import SEO from '../components/seo';

import UpcomingEventCard from '../components/upcoming-event-card/upcoming-event-card';

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <Typography gutterBottom variant="h1" component="h1">
            Hi people
        </Typography>

        <Box display="flex" p={1}>
            <Box p={1} flexGrow={1}>
                <Typography gutterBottom variant="h4" component="h3">
                    Upcoming events
                </Typography>
            </Box>
            <Box>
                <Button size="large" color="primary">
                    All upcoming events
                </Button>
            </Box>
        </Box>

        <Grid container spacing={3}>
            <Grid item>
                <UpcomingEventCard />
            </Grid>
            <Grid item>
                <UpcomingEventCard />
            </Grid>
            <Grid item>
                <UpcomingEventCard />
            </Grid>
            <Grid item>
                <UpcomingEventCard />
            </Grid>
            <Grid item>
                <UpcomingEventCard />
            </Grid>
        </Grid>

        <Box display="flex" m={7} justifyContent="center">
            <Box>
                <Button variant="contained" color="primary" size="large">
                    All upcoming events
                </Button>
            </Box>
        </Box>

        <Box style={{ maxWidth: `800px`, width: '100%', marginBottom: `1.45rem` }}>
            <Image />
        </Box>

        <Link to="/page-2/">Go to page 2</Link>
    </Layout>
);

export default IndexPage;
