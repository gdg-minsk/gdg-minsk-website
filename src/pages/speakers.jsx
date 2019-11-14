import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Image from '../components/shared/image';
import SpeakerCard from '../components/shared/speaker-card/speaker-card';

const useStyles = makeStyles(theme => ({
    bannerContainer: {
        color: 'white',
    },
    bannerButton: {
        marginTop: theme.spacing(1),
    },
    gridItem: {
        width: '33%',
    },
    '@media (max-width: 960px)': {
        gridItem: {
            width: '50%',
        },
    },
    '@media (max-width: 600px)': {
        gridItem: {
            width: '100%',
        },
    },
}));

const SpeakersPage = () => {
    const classes = useStyles();
    // const eventCards = EVENT_CARD_DATA.map(eventCard => (
    //     <Grid key={eventCard.id} className={classes.gridItem} item>
    //         </>
    //     </Grid>
    // ));

    return (
        <Layout>
            <SEO title="Speakers" />

            <Typography gutterBottom variant="h1" component="h1">
                Speakers
            </Typography>

            <Grid container spacing={3}>
                <Grid className={classes.gridItem} item>
                    <SpeakerCard />
                </Grid>
                <Grid className={classes.gridItem} item>
                    <SpeakerCard />
                </Grid>
                <Grid className={classes.gridItem} item>
                    <SpeakerCard />
                </Grid>
                <Grid className={classes.gridItem} item>
                    <SpeakerCard />
                </Grid>
                <Grid className={classes.gridItem} item>
                    <SpeakerCard />
                </Grid>
            </Grid>

            <Box style={{ maxWidth: `800px`, width: '100%', marginBottom: `1.45rem` }}>
                <Image />
            </Box>
        </Layout>
    );
};

export default SpeakersPage;
