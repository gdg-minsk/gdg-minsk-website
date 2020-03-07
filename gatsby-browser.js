import React from 'react';
import PropTypes from 'prop-types';
import { WindowDimensionsProvider } from './src/hooks/window-size';

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(`This application has been updated. Reload to display the latest version?`);

    if (answer) {
        window.location.reload();
    }
};

export const onRouteUpdate = () => {
    if (window.analytics) {
        window.analytics.page();
    }
};

const RootElement = ({ element }) => <WindowDimensionsProvider>{element}</WindowDimensionsProvider>;

RootElement.propTypes = {
    element: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export const wrapRootElement = RootElement;
