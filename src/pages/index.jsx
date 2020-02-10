import React, { useState, useCallback } from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import Carousel, { Modal, ModalGateway } from 'react-images';
import Gallery from 'react-photo-gallery';

import Layout from '../components/shared/layout/layout';
import Image from '../components/shared/image';
import SEO from '../components/shared/seo';
// import Link from '../components/shared/link';

import EventCard from '../components/shared/event-card/event-card';

import EVENT_CARD_DATA from '../mock-data/event-card.mock';

const photos = [
    {
        src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599',
        width: 4,
        height: 3,
    },
    {
        src: 'https://source.unsplash.com/Dm-qxdynoEc/800x799',
        width: 1,
        height: 1,
    },
    {
        src: 'https://source.unsplash.com/qDkso9nvCg0/600x799',
        width: 3,
        height: 4,
    },
    {
        src: 'https://source.unsplash.com/iecJiKe_RNg/600x799',
        width: 3,
        height: 4,
    },
    // {
    //     src: 'https://source.unsplash.com/epcsn8Ed8kY/600x799',
    //     width: 3,
    //     height: 4,
    // },
    // {
    //     src: 'https://source.unsplash.com/NQSWvyVRIJk/800x599',
    //     width: 4,
    //     height: 3,
    // },
    // {
    //     src: 'https://source.unsplash.com/zh7GEuORbUw/600x799',
    //     width: 3,
    //     height: 4,
    // },
    // {
    //     src: 'https://source.unsplash.com/PpOHJezOalU/800x599',
    //     width: 4,
    //     height: 3,
    // },
    // {
    //     src: 'https://source.unsplash.com/I1ASdgphUH4/800x599',
    //     width: 4,
    //     height: 3,
    // },
];

const useStyles = makeStyles(theme => ({
    gridItem: {
        width: '50%',
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

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <Layout>
            <SEO title="Home" />

            <Grid container spacing={3}>
                <Grid className={classes.gridItem} item>
                    <Typography variant="h5" component="h3" gutterBottom color="primary">
                        You are on the alpha version of the website of the Belarusian Google Developer Group
                    </Typography>

                    <Typography variant="body1" component="p">
                        We provide tools and opportunities to learn new technologies and be connected to the local
                        community, improving the local ecosystem and the quality of local talent. When you join a Google
                        Developer Group, you’ll have the opportunity to meet local developers with similar interests in
                        technology. A GDG meetup event includes talks on a wide range of technical topics where you can
                        learn new skills through hands-on workshops. The community prides itself on being an inclusive
                        environment where everyone and anyone interested in tech - from beginner developers to
                        experienced professionals - all are welcome to join.
                    </Typography>
                </Grid>
                <Grid className={classes.gridItem} item>
                    <Gallery photos={photos} onClick={openLightbox} columns={2} />
                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={photos.map(x => ({
                                        ...x,
                                        srcset: x.srcSet,
                                        caption: x.title,
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </Grid>
            </Grid>

            {/* <Box display="flex" p={1}>
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
            </Box> */}
        </Layout>
    );
};

export default IndexPage;
