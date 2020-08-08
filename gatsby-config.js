require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
    siteMetadata: {
        title: 'GDG Minsk',
        description: 'GDG Description.',
        author: 'gdg',
        menuItems: [
            { path: '/events', title: 'Events' },
            { path: '/speakers', title: 'Speakers' },
            { path: '/contacts', title: 'Contacts' },
        ],
    },
    plugins: [
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'images',
                path: `${__dirname}/static/img`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'cmsImages',
                path: `${__dirname}/static/img/cms`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/data/social-network`,
                name: `socialNetwork`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/data/speakers`,
                name: `speakers`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/data/events`,
                name: `events`,
            },
        },
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/data/pages`,
                name: 'pages',
            },
        },
        {
            resolve: `gatsby-transformer-remark`,
            options: {
                plugins: [
                    {
                        resolve: `gatsby-remark-relative-images`,
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                            maxWidth: 2048,
                        },
                    },
                ],
            },
        },
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'GDG Minsk',
                short_name: 'GDG Minsk',
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'static/img/gdg-icon.png',
            },
        },
        'gatsby-plugin-offline',
        `gatsby-theme-material-ui`,
        'gatsby-plugin-netlify',
        'gatsby-plugin-netlify-cms',
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /svg/,
                },
            },
        },
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `Roboto`,
                    },
                ],
            },
        },
        {
            resolve: `gatsby-plugin-segment-js`,
            options: {
                prodKey: process.env.SEGMENT_PRODUCTION_WRITE_KEY,
                devKey: process.env.SEGMENT_DEV_WRITE_KEY,
                trackPage: false,
                delayLoad: false,
                delayLoadTime: 1000,
            },
        },
        'gatsby-plugin-typescript',
        'gatsby-plugin-sass'
    ],
};
