import React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
    setHeadComponents([
        <link rel="preconnect" key="dns-preconnect-google-font" href="https://fonts.gstatic.com" />,
        <link rel="dns-prefetch" key="dns-prefetch-google-font" href="https://fonts.gstatic.com" />,

        <link rel="preconnect" key="dns-preconnect-segment" href="https://cdn.segment.com" />,
        <link rel="dns-prefetch" key="dns-prefetch-segment" href="https://cdn.segment.com" />,

        <link rel="preconnect" key="dns-preconnect-segment-api" href="https://api.segment.io" />,
        <link rel="dns-prefetch" key="dns-prefetch-segment-api" href="https://api.segment.io" />,

        <link rel="preconnect" key="dns-preconnect-google-analytics" href="https://www.google-analytics.com" />,
        <link rel="dns-prefetch" key="dns-prefetch-google-analytics" href="https://www.google-analytics.com" />,
    ]);
};
