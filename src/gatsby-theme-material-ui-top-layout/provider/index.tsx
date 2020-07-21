import React from 'react';
import PropTypes from 'prop-types';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';

const ThemeProvider = ({ children, theme }) => (
    <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </MuiThemeProvider>
);

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
    theme: PropTypes.string.isRequired,
};

export default ThemeProvider;
