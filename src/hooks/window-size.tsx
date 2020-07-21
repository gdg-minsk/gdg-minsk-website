import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import debounce from 'lodash-es/debounce';

const useWindowSize = () => {
    const isClient = typeof window === 'object';

    const getSize = () => {
        return {
            width: isClient ? window.innerWidth : undefined,
            height: isClient ? window.innerHeight : undefined,
        };
    };

    const [dimensions, setDimensions] = useState(getSize);

    useEffect(() => {
        if (!isClient) {
            return false;
        }

        const handleResize = debounce(() => {
            setDimensions(getSize());
        }, 100);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return dimensions;
};

const WindowDimensionsCtx = createContext({
    width: undefined,
    height: undefined,
});

export const WindowDimensionsProvider = ({ children }) => {
    const dimensions = useWindowSize();

    return <WindowDimensionsCtx.Provider value={dimensions}>{children}</WindowDimensionsCtx.Provider>;
};

WindowDimensionsProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export const useWindowDimensions = () => useContext(WindowDimensionsCtx);
