import React from 'react';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Link from '../components/shared/link';
import SocialIcons from '../components/shared/social-icons';

import { useWindowDimensions } from '../hooks/window-size';

import { MobileWidth } from '../constants/window-sizes';

const useStyles = makeStyles(() => ({
    text: {
        fontSize: '30px',
        lineHeight: '35px',
        textTransform: 'uppercase',
    },
    link: {
        fontWeight: 'bold',
    },
    emailLink: {
        lineHeight: '50px',
    },
    emailInfo: {
        marginBottom: '105px',
        display: 'inline-block',
        textAlign: 'center',
    },
    socialNetworkText: {
        marginBottom: '20px',
    },
    socialIconsContainer: {
        marginTop: '100px',
    },
    '@media (max-width: 600px)': {
        page: {
            alignSelf: 'center',
        },
        text: {
            fontSize: '17px',
            lineHeight: '20px',
        },
        socialIconsContainer: {
            display: 'none',
        },
        emailInfo: {
            display: 'flex',
            flexDirection: 'column',
        },
        emailLink: {
            marginTop: '10px',
        },
        socialNetworkText: {
            marginBottom: '10px',
        },
    },
}));

const ContactsPage = () => {
    const classes = useStyles();

    const { width } = useWindowDimensions();

    return (
        <Layout isSocialIconsVisible={width <= MobileWidth}>
            <SEO title="Contacts" />

            <Box className={classes.page}>
                <Box className={classes.emailInfo}>
                    <Typography className={classes.text} component="p">
                        Contact us on any questions on our email
                    </Typography>

                    <Link
                        className={classNames(classes.link, classes.text, classes.emailLink)}
                        to="mailto:GDG@gmail.com"
                    >
                        GDG@GMAIL.COM
                    </Link>
                </Box>

                <Typography className={classNames(classes.socialNetworkText, classes.text)} component="p" gutterBottom>
                    Join our Telegram group{' '}
                    <Link className={classes.link} to="https://t.me/gdgminsk" target="blank">
                        GDG_MINSK
                    </Link>
                </Typography>

                <Typography className={classNames(classes.socialNetworkText, classes.text)} component="p" gutterBottom>
                    Follow us on{' '}
                    <Link className={classes.link} to="https://www.facebook.com/groups/gdgminsk" target="blank">
                        FACEBOOK
                    </Link>{' '}
                    and{' '}
                    <Link className={classes.link} to="https://twitter.com/gdgminsk" target="blank">
                        TWITTER
                    </Link>
                </Typography>

                <Typography className={classes.text} variant="h5" component="p">
                    Our hashtag on social media is{' '}
                    <Link
                        className={classes.link}
                        to="https://www.instagram.com/explore/tags/gdg_minsk/"
                        target="blank"
                    >
                        #GDG_MINSK
                    </Link>
                </Typography>

                <Box className={classes.socialIconsContainer} display="flex">
                    <SocialIcons iconSize={105} />
                </Box>
            </Box>
        </Layout>
    );
};

export default ContactsPage;
