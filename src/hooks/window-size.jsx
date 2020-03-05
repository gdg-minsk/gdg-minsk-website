import React, { createContext, useContext, useState, useEffect } from 'react';

import debounce from 'lodash-es/debounce';

const useWindowSize = () => {
    const [dimensions, setDimensions] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = debounce(() => {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }, 100);

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return dimensions;
};

const WindowDimensionsCtx = createContext(null);

export const WindowDimensionsProvider = ({ children }) => {
    const dimensions = useWindowSize();

    return <WindowDimensionsCtx.Provider value={dimensions}>{children}</WindowDimensionsCtx.Provider>;
};

export const useWindowDimensions = () => useContext(WindowDimensionsCtx);
