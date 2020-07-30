import React, { ReactElement } from 'react';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import SocialIcons from '../../social-icons';

import Link from '../../link';
import '../../../../styles/menuStyles.css';

interface MenuItem {
    path: string;
    title: string;
}

interface Props {
    menuItems: MenuItem[];
    onClose: () => void;
}

const MobileMenu = ({ menuItems, onClose }: Props): ReactElement => {
    return (
        <Box display="flex" flexDirection="column" height="100%">
            <Box margin="20px 20px 0 0" alignSelf="flex-end">
                <Button onClick={onClose} classes={{ text: 'closeBtnText' }} endIcon={<CloseIcon>close</CloseIcon>}>
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
                            activeClassName="activeLink"
                        >
                            <Typography className="menuItem" variant="subtitle1" component="h5">
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
                <Typography className="contactUsText" component="p">
                    Contact us on any questions
                </Typography>

                <Link className="emailLink" to="mailto:GDG@gmail.com">
                    GDG@GMAIL.COM
                </Link>
            </Box>
        </Box>
    );
};

export default MobileMenu;
