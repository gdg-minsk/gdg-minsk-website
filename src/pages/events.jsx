import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Image from '../components/shared/image';

const EventPage = () => (
    <Layout
        parallaxContent={<h1>test</h1>}
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
