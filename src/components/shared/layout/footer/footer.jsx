import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import getSocialMediaIcon from '../../../../tools/social-media';

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        zIndex: 2,
    },
    socialIcon: {
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        marginRight: '3px',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.5)',
        },
    },
    '@media (max-width: 550px)': {
        footer: {
            backgroundColor: '#fff',
        },
        socialIconsContainer: {
            justifyContent: 'center',
        },
    },
}));

const Footer = ({ socialMedias }) => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Box display="flex" className={classes.socialIconsContainer}>
                    {socialMedias.map(({ type, url }) => {
                        const Icon = getSocialMediaIcon(type);

                        if (!Icon) {
                            return null;
                        }

                        return (
                            <Link className={classes.socialIcon} href={url} target="blank" key={type}>
                                <Icon />
                            </Link>
                        );
                    })}
                </Box>
            </Container>
        </footer>
    );
};

Footer.propTypes = {
    socialMedias: PropTypes.arrayOf(
        PropTypes.shape({
            type: PropTypes.string,
            url: PropTypes.string,
        }),
    ).isRequired,
};

export default Footer;
