module.exports = {
    siteMetadata: {
        title: 'GDG Minsk',
        description: 'GDG Description.',
        author: 'gdg',
        menuItems: [
            { path: '/events', title: 'Events' },
            { path: '/speakers', title: 'Speakers' },
            { path: '/about', title: 'About' },
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
        'gatsby-plugin-material-ui',
        'gatsby-plugin-netlify',
    ],
};
