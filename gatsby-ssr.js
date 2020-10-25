import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <link rel="preconnect" key="dns-preconnect-segment" href="https://cdn.segment.com" />,
        <link rel="dns-prefetch" key="dns-prefetch-segment" href="https://cdn.segment.com" />,

        <link rel="preconnect" key="dns-preconnect-segment-api" href="https://api.segment.io" />,
        <link rel="dns-prefetch" key="dns-prefetch-segment-api" href="https://api.segment.io" />,

        <link rel="preconnect" key="dns-preconnect-google-analytics" href="https://www.google-analytics.com" />,
        <link rel="dns-prefetch" key="dns-prefetch-google-analytics" href="https://www.google-analytics.com" />,

        <link
            rel="stylesheet"
            key="labs-styles"
            href="https://api.mapbox.com/mapbox-assembly/v0.24.0/assembly.min.css"
        />,
    ]);
};
