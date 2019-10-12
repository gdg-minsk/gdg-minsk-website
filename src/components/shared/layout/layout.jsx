import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './header/header';
import DesktopMenu from './header/desktop-menu';
import MobileMenu from './header/mobile-menu';

const Layout = ({ children }) => {
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
        <>
            <CssBaseline />

            <Header
                title={data.site.siteMetadata.title}
                desktopMenu={<DesktopMenu menuItems={data.site.siteMetadata.menuItems} />}
                mobileMenu={<MobileMenu menuItems={data.site.siteMetadata.menuItems} />}
            />

            <Container maxWidth="lg">
                <main>{children}</main>
            </Container>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;
