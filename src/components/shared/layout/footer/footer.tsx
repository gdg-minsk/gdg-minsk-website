import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import SocialIcons from '../../social-icons';

const useStyles = makeStyles(() => ({
    footer: {
        padding: '9px 0',
        marginTop: 'auto',
        zIndex: 2,
    },
    '@media (max-width: 600px)': {
        footer: {
            backgroundColor: '#fff',
            borderTop: '1px solid #EFEFEF',
            marginTop: '45px',
        },
        socialIconsContainer: {
            justifyContent: 'center',
        },
    },
}));

const Footer = ({ isSocialIconsVisible }): ReactElement => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                {isSocialIconsVisible && (
                    <Box display="flex" className={classes.socialIconsContainer}>
                        <SocialIcons />
                    </Box>
                )}
            </Container>
        </footer>
    );
};

Footer.defaultProps = {
    isSocialIconsVisible: true,
};

Footer.propTypes = {
    isSocialIconsVisible: PropTypes.bool,
};

export default Footer;
