import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Box from '@material-ui/core/Box';

import { ParallaxProvider, ParallaxBanner } from 'react-scroll-parallax';

import Header from './header/header';
import DesktopMenu from './header/desktop-menu';
import MobileMenu from './header/mobile-menu';
import Footer from './footer/footer';

const useStyles = makeStyles(() => ({
    root: {
        minHeight: '100vh',
    },
    parallaxContentWrapper: {
        height: '100%',
        '&:before': {
            background: 'rgba(0, 0, 0, 0.5)',
        },
        '&:after,&:before': {
            position: 'absolute',
            zIndex: '1',
            width: '100%',
            height: '100%',
            display: 'block',
            left: '0',
            top: '0',
            content: "''",
        },
    },
    pageWrapper: {
        margin: '-60px 30px 0px',
        boxShadow:
            '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
        borderRadius: 6,
        zIndex: 3,
        background: 'white',
        position: 'relative',
    },
    pageContentContainer: {
        paddingTop: 50,
    },
    parallaxContainer: {
        height: 'calc(100% - 60px)',
        padding: '80px 0 20px',
        position: 'relative',
        zIndex: 2,
        maxWidth: '50%',
        '@media (max-width: 1024px)': {
            maxWidth: '100%',
        },
    },
}));

const Layout = ({ children, parallaxContent, changeHeaderStyleHeight, bannerImages }) => {
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
                changeHeaderStyleHeight={changeHeaderStyleHeight}
                isParallax={!!bannerImages.length}
            />

            {!!bannerImages.length && (
                <ParallaxProvider>
                    <ParallaxBanner
                        layers={bannerImages}
                        style={{
                            height: '70vh',
                        }}
                    >
                        <>
                            <Container maxWidth="lg" className={classes.parallaxContentWrapper}>
                                <Box
                                    display="flex"
                                    flexDirection="column"
                                    // alignItems="flex-end"
                                    justifyContent="center"
                                    className={classes.parallaxContainer}
                                >
                                    {parallaxContent}
                                </Box>
                            </Container>
                        </>
                    </ParallaxBanner>
                </ParallaxProvider>
            )}

            <Box className={classes.pageWrapper}>
                <Container maxWidth="lg" className={classes.pageContentContainer}>
                    {children}
                </Container>
            </Box>

            <Footer organizationName={data.site.siteMetadata.title} />
        </Box>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    parallaxContent: PropTypes.node,
    bannerImages: PropTypes.arrayOf(
        PropTypes.shape({
            image: PropTypes.string.isRequired,
            amount: PropTypes.number.isRequired,
        }),
    ),
    changeHeaderStyleHeight: PropTypes.number,
};

Layout.defaultProps = {
    parallaxContent: null,
    changeHeaderStyleHeight: 450,
    bannerImages: [],
};

export default Layout;
