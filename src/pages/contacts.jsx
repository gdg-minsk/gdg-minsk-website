import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Image from '../components/shared/image';

const ContactsPage = () => (
    <Layout>
        <SEO title="Contacts" />

        <Typography variant="h6" component="p" gutterBottom>
            Contact us on any questions on our email
        </Typography>

        <Typography variant="h5" component="p" gutterBottom>
            <a href="mailto:GDG@gmail.com">GDG@GMAIL.COM</a>
        </Typography>

        <Typography variant="h5" component="p" gutterBottom>
            Join our Telegram group GDG_MINSK
        </Typography>
        <Typography variant="h5" component="p" gutterBottom>
            Follow us on Facebook and Twitter
        </Typography>
        <Typography variant="h5" component="p">
            Our hashtag on social media is #GDG_MINSK
        </Typography>
    </Layout>
);

export default ContactsPage;
