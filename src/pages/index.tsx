import React, { ReactElement } from 'react';
import classNames from 'classnames';
import '../styles/elements.css';

import { useStaticQuery, graphql } from 'gatsby';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';

import PhotoGallery from '../components/home/photo-gallery';
import HomePageWidget from '../components/shared/widgets/home-page-widget/home-page-widget';

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
    widget: {
        marginBottom: 35,
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

const IndexPage = (): ReactElement => {
    const classes = useStyles();

    const data = useStaticQuery(graphql`
        {
            allContentfulGallery {
                edges {
                    node {
                        photos {
                            file {
                                url
                                fileName
                            }
                        }
                    }
                }
            }
            allContentfulLeadTexts(filter: { pageRef: { eq: "home" } }) {
                edges {
                    node {
                        body {
                            raw
                        }
                        header
                    }
                }
            }
        }
    `);
    const {
        allContentfulGallery: {
            edges: [
                {
                    node: { photos },
                },
            ],
        },
        allContentfulLeadTexts: {
            edges: [
                {
                    node: {
                        body: { raw },
                        header,
                    },
                },
            ],
        },
    } = data;
    const eventDate = new Date();
    const value = JSON.parse(raw).content[0].content[0].value;
    return (
        <Layout>
            <SEO title="Google Developer Group Minsk" />

            <Grid classes={{ container: classes.pageContainer }} container spacing={3}>
                <Grid className={classes.gridItem} item>
                    <Box className={classes.pageContent}>
                        <Box className={classes.widget}>
                            {/* <HomePageWidget
                                date={eventDate}
                                place={homePageWidget.place}
                                eventType={homePageWidget.eventType}
                                url={homePageWidget.url}
                            /> */}
                        </Box>
                        <Typography variant="h5" component="h1" gutterBottom color="primary">
                            {header}
                        </Typography>

                        <Typography variant="body1" component="p">
                            {value}
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
