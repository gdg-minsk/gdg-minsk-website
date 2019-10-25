import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/shared/layout/layout';
import Image from '../components/shared/image';
import SEO from '../components/shared/seo';
import Link from '../components/shared/link';

import EventCard from '../components/shared/event-card/event-card';

import EVENT_CARD_DATA from '../mock-data/event-card.mock';

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

const IndexPage = () => {
    const classes = useStyles();
    const eventCards = EVENT_CARD_DATA.map(eventCard => (
        <Grid key={eventCard.id} className={classes.gridItem} item>
            <EventCard
                imageUrl={eventCard.imageUrl}
                imageTitle={eventCard.imageTitle}
                speakers={eventCard.speakers}
                title={eventCard.title}
                description={eventCard.description}
                date={eventCard.date}
            />
        </Grid>
    ));

    return (
        <Layout
            parallaxContent={
                <Box className={classes.bannerContainer}>
                    <Typography gutterBottom variant="h2" component="h2">
                        Let’s write code together
                    </Typography>
                    <Typography gutterBottom variant="body1" component="h4">
                        Google Developer Group (GDG) Minsk is a non-profit developers group that was created for people
                        who&apos;d like to know more about Google technologies and want to share their experience with
                        others. Our technical directions: Android, Web, Cloud, IoT.
                    </Typography>

                    <Link to="/about" underline="none">
                        <Button variant="contained" color="secondary" className={classes.bannerButton}>
                            Read more about GDG
                        </Button>
                    </Link>
                </Box>
            }
            bannerImages={[
                {
                    image: '/img/gdg-cover.jpg',
                    amount: 0.4,
                },
            ]}
        >
            <SEO title="Home" />

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
                {eventCards}
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
        </Layout>
    );
};

export default IndexPage;
