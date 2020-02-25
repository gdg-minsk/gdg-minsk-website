import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useStaticQuery, graphql } from 'gatsby';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import Header from './header/header';
import DesktopMenu from './header/desktop-menu';
import MobileMenu from './header/mobile-menu';
import Footer from './footer/footer';

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
        backgroundColor: '#fff',

        display: 'flex',
        flexDirection: 'column',

        '&::after': {
            content: '""',
            backgroundImage: 'url(/svg/stork-with-polygons.svg)',
            backgroundPosition: 'right bottom',
            backgroundRepeat: 'no-repeat',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'fixed',
            opacity: 0.5,
        },
    },
    pageWrapper: {
        marginTop: 64,
        zIndex: 2,
        flexGrow: 1,
        display: 'flex',
    },
    pageContentContainer: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    '@media (max-width: 600px)': {
        root: {
            '&::after': {
                backgroundImage: 'none',
            },
        },
    },
}));

const Layout = ({ children }) => {
    const classes = useStyles();

    const data = useStaticQuery(graphql`
        query SiteTitleWithMenuQuery {
            site {
                siteMetadata {
                    title
                    menuItems {
                        title
                        path
                    }
                }
            }
        }
    `);

    return (
        <Box className={classes.root} display="flex" flexDirection="column">
            <CssBaseline />

            <Header
                title={data.site.siteMetadata.title}
                desktopMenu={<DesktopMenu menuItems={data.site.siteMetadata.menuItems} />}
                mobileMenu={<MobileMenu menuItems={data.site.siteMetadata.menuItems} />}
            />

            <Box className={classes.pageWrapper}>
<<<<<<< HEAD
                <Container className={classes.pageContentContainer}>{children}</Container>
=======
                <Container maxWidth="lg" className={classes.pageContentContainer}>
                    {children}
                </Container>
>>>>>>> master
            </Box>

            <Footer />
        </Box>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
