import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Image from '../components/shared/image';

const AboutPage = () => (
    <Layout>
        <SEO title="About" />

        <Typography gutterBottom variant="h1" component="h1">
            About
        </Typography>

        <Box style={{ maxWidth: `800px`, width: '100%', marginBottom: `1.45rem` }}>
            <Image />
        </Box>
    </Layout>
);

export default AboutPage;
