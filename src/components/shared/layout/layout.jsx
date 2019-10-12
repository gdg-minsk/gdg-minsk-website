import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';

import Header from './header/header';
import DesktopMenu from './header/desktop-menu';
import MobileMenu from './header/mobile-menu';
import Footer from './footer/footer';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
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
        <Box className={classes.root}>
            <CssBaseline />

            <Header
                title={data.site.siteMetadata.title}
                desktopMenu={<DesktopMenu menuItems={data.site.siteMetadata.menuItems} />}
                mobileMenu={<MobileMenu menuItems={data.site.siteMetadata.menuItems} />}
            />

            <Container maxWidth="lg">
                <main>{children}</main>
            </Container>

            <Footer organizationName={data.site.siteMetadata.title}/>
        </Box>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
