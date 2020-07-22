import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

import SocialIcons from '../../social-icons';

import Link from '../../link';

const useStyles = makeStyles(() => ({
    activeLink: {
        textDecoration: 'underline',
    },
    contactUsText: {
        fontSize: '17px',
        lineHeight: '20px',
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#000000',
    },
    emailLink: {
        marginTop: '10px',
        fontWeight: 'bold',
        fontSize: '26px',
        lineHeight: '30px',
        textTransform: 'uppercase',
        color: '#3372DF',
        marginBottom: '32px',
    },
    menuItem: {
        fontSize: '30px',
        lineHeight: '35px',
        textTransform: 'uppercase',
        color: '#6D7278',
        marginBottom: '40px',
    },
    closeBtnText: {
        fontSize: '19px',
        lineHeight: '22px',
        textTransform: 'uppercase',
        color: '#5F6368',
    },
}));

const MobileMenu = ({ menuItems, onClose }) : ReactElement => {
    const classes = useStyles();

    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Box margin="20px 20px 0 0" alignSelf="flex-end">
                <Button
                    onClick={onClose}
                    classes={{ text: classes.closeBtnText }}
                    endIcon={<CloseIcon>close</CloseIcon>}
                >
                    CLOSE
                </Button>
            </Box>
            <Box
                component="nav"
                display="flex"
                flexDirection="column"
                flexGrow="1"
                alignItems="center"
                justifyContent="center"
            >
                {menuItems.map(x => {
                    return (
                        <Link
                            key={x.path}
                            to={x.path}
                            variant="button"
                            color="textPrimary"
                            activeClassName={classes.activeLink}
                        >
                            <Typography className={classes.menuItem} variant="subtitle1" component="h5">
                                {x.title}
                            </Typography>
                        </Link>
                    );
                })}
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                    <SocialIcons iconSize={56} />
                </Box>
                <Typography className={classes.contactUsText} component="p">
                    Contact us on any questions
                </Typography>

                <Link className={classes.emailLink} to="mailto:GDG@gmail.com">
                    GDG@GMAIL.COM
                </Link>
            </Box>
        </Box>
    );
};

MobileMenu.propTypes = {
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            path: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onClose: PropTypes.func.isRequired,
};

export default MobileMenu;
