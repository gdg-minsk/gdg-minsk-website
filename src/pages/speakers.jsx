import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Image from '../components/shared/image';

const SpeakersPage = () => (
    <Layout>
        <SEO title="Speakers" />

        <Typography gutterBottom variant="h1" component="h1">
            Speakers
        </Typography>

        <Box style={{ maxWidth: `800px`, width: '100%', marginBottom: `1.45rem` }}>
            <Image />
        </Box>
    </Layout>
);

export default SpeakersPage;
