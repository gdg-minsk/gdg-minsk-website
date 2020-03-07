import React from 'react';
import classNames from 'classnames';

import { useStaticQuery, graphql } from 'gatsby';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/shared/layout/layout';
import HomePageWidget from '../components/shared/widgets/home-page-widget/home-page-widget';
import SEO from '../components/shared/seo';

import PhotoGallery from '../components/home/photo-gallery';

const useStyles = makeStyles(() => ({
    pageContainer: {
        flexGrow: 1,
    },
    gridItem: {
        width: '50%',
    },
    photoBoxColumn: {
        maxHeight: 'calc(100vh - 160px)',
        top: '60px',
        position: 'sticky',
    },
    pageContent: {
        marginRight: '50px',
    },
    '@media (max-width: 600px)': {
        gridItem: {
            width: '100%',
        },
        pageContent: {
            margin: '0',
        },
    },
}));

const IndexPage = () => {
    const classes = useStyles();

    const data = useStaticQuery(graphql`
        query IndexPagePhotos {
            markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
                frontmatter {
                    pageTitle
                    title
                    pageText
                    photos {
                        description
                        photo {
                            childImageSharp {
                                fluid(maxWidth: 1920) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    const {
        markdownRemark: {
            frontmatter: { photos, pageText, pageTitle, title },
        },
    } = data;

    return (
        <Layout>
            <SEO title={pageTitle} />

            <Grid classes={{ container: classes.pageContainer }} container spacing={3}>
                <Grid className={classes.gridItem} item>
                    <Box className={classes.pageContent}>
                        <HomePageWidget />
                        <Typography variant="h5" component="h1" gutterBottom color="primary">
                            {title}
                        </Typography>

                        <Typography variant="body1" component="p">
                            {pageText}
                        </Typography>
                    </Box>
                </Grid>
                <Grid className={classNames(classes.gridItem, classes.photoBoxColumn)} item>
                    <PhotoGallery photos={photos} />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default IndexPage;
