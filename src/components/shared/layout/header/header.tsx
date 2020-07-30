import React, { useState, useCallback, ReactElement } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Img from 'gatsby-image';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import Menu from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

import DesktopMenu from './desktop-menu';
import MobileMenu from './mobile-menu';
import Link from '../../link';

import '../../../../styles/headerStyles.css';

const Header = (): ReactElement => {
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = useCallback(() => {
        setMobileOpen(!mobileOpen);
    }, [mobileOpen]);

    const trigger = useScrollTrigger({
        threshold: 40,
    });

    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    menuItems {
                        title
                        path
                    }
                }
            }
            file(relativePath: { eq: "gdg-logo.png" }) {
                childImageSharp {
                    fixed(height: 25) {
                        ...GatsbyImageSharpFixed
                    }
                }
            }
        }
    `);

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            <AppBar position="fixed" className="appBar">
                <Toolbar disableGutters>
                    <Container maxWidth="lg">
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1}>
                                <Link to="/" className="logoLink">
                                    <Img
                                        className="headerLogo"
                                        fixed={data.file.childImageSharp.fixed}
                                        alt={data.site.siteMetadata.title}
                                    />
                                </Link>
                            </Box>
                            <Box>
                                <Hidden xsDown implementation="css">
                                    <DesktopMenu menuItems={data.site.siteMetadata.menuItems} />
                                </Hidden>
                            </Box>
                            <Box>
                                <Hidden smUp>
                                    <IconButton aria-label="open drawer" onClick={handleDrawerToggle}>
                                        <Menu />
                                    </IconButton>
                                </Hidden>
                            </Box>
                        </Box>
                    </Container>
                </Toolbar>
                <Hidden mdUp implementation="js">
                    <Drawer
                        variant="temporary"
                        anchor="right"
                        open={mobileOpen}
                        classes={{
                            paper: 'drawerPaper',
                        }}
                        onClose={handleDrawerToggle}
                    >
                        <MobileMenu menuItems={data.site.siteMetadata.menuItems} onClose={handleDrawerToggle} />
                    </Drawer>
                </Hidden>
            </AppBar>
        </Slide>
    );
};

export default Header;
