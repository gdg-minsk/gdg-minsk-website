import React, { ReactElement } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Image from '../components/shared/image';

const EventPage = (): ReactElement => (
    <Layout
        parallaxContent={
            <h1 style={{ color: 'red' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt feugiat massa, ut ornare
                tortor suscipit quis. Mauris mollis mauris quis lacus pellentesque, non hendrerit odio consectetur.
                Vestibulum nec nisi sed urna egestas rhoncus et nec tellus. Praesent sit amet cursus metus. Sed tortor
                nulla, vehicula eget consequat nec, consectetur et ligula. Sed pretium ex felis, in dapibus nunc
            </h1>
        }
        bannerImages={[
            {
                image: '/img/gdg-stickers.jpg',
                amount: 0.4,
            },
        ]}
    >
        <SEO title="Events" />

        <Typography gutterBottom variant="h1" component="h1">
            Events
        </Typography>

        <Box style={{ maxWidth: `800px`, width: '100%', marginBottom: `1.45rem` }}>
            <Image />
        </Box>
    </Layout>
);

export default EventPage;
