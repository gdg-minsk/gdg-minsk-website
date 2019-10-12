import React from 'react';
import PropTypes from 'prop-types';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto',
    backgroundColor: 'white',
  },
}));

const Footer = ({organizationName}) => {
  const classes = useStyles();

  return (
    <>
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body2" color="textSecondary" align="center">
                    <Link color="inherit" href="./">
                        {organizationName}
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </footer>
    </>
  );
}

Footer.propTypes = {
    organizationName: PropTypes.string.isRequired,
};

export default Footer;