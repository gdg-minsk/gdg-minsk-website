import React, { ReactElement } from 'react';

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Link from '../../link';

import '../../../../styles/menuStyles.css';

interface MenuItem {
    path: string;
    title: string;
}

interface Props {
    menuItems: MenuItem[];
}

const DesktopMenu = ({ menuItems }: Props): ReactElement => {
    return (
        <Box component="nav" display="flex">
            {menuItems.map(x => {
                return (
                    <Link
                        key={x.path}
                        to={x.path}
                        variant="button"
                        color="textPrimary"
                        className="link"
                        activeClassName="activeLink"
                    >
                        <Typography variant="subtitle1" component="h5">
                            {x.title}
                        </Typography>
                    </Link>
                );
            })}
        </Box>
    );
};

export default DesktopMenu;
