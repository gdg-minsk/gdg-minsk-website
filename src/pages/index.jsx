import React from 'react';
import classNames from 'classnames';

import { useStaticQuery, graphql } from 'gatsby';

import Grid from '@material-ui/core/Grid';
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
    '@media (max-width: 960px)': {
        gridItem: {
            width: '50%',
        },
    },
    '@media (max-width: 600px)': {
        gridItem: {
            width: '100%',
        },
    },
    photoBoxContainer: {
        display: 'grid',
        width: '100%',
        height: '100%',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoRows: '14%',
        gridColumnGap: '17px',
        gridRowGap: '17px',
    },
    photo: {
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        cursor: 'pointer',
    },
    box0: { gridColumnStart: '1', gridColumnEnd: '2', gridRowStart: '1', gridRowEnd: '4' },
    box1: { gridColumnStart: '2', gridColumnEnd: '3', gridRowStart: '1', gridRowEnd: '1' },
    box2: { gridColumnStart: '1', gridColumnEnd: '2', gridRowStart: '4', gridRowEnd: '5' },
    box3: { gridColumnStart: '2', gridColumnEnd: '3', gridRowStart: '2', gridRowEnd: '5' },
    box4: { gridColumnStart: '1', gridColumnEnd: '3', gridRowStart: '5', gridRowEnd: '7' },
}));

const IndexPage = () => {
    const classes = useStyles();

    const data = useStaticQuery(graphql`
        query IndexPagePhotos {
            markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
                frontmatter {
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
            frontmatter: { photos },
        },
    } = data;

    return (
        <Layout>
            <SEO title="Home" />

            <Grid classes={{ container: classes.pageContainer }} container spacing={3}>
                <Grid className={classes.gridItem} item>
                    <HomePageWidget />
                    <Typography variant="h5" component="h3" gutterBottom color="primary">
                        You are on the alpha version of the website of the Belarusian Google Developer Group
                    </Typography>

                    <Typography variant="body1" component="p">
                        We provide tools and opportunities to learn new technologies and be connected to the local
                        community, improving the local ecosystem and the quality of local talent. When you join a Google
                        Developer Group, you’ll have the opportunity to meet local developers with similar interests in
                        technology. A GDG meetup event includes talks on a wide range of technical topics where you can
                        learn new skills through hands-on workshops. The community prides itself on being an inclusive
                        environment where everyone and anyone interested in tech - from beginner developers to
                        experienced professionals - all are welcome to join. We provide tools and opportunities to learn
                        new technologies and be connected to the local community, improving the local ecosystem and the
                        quality of local talent. When you join a Google Developer Group, you’ll have the opportunity to
                        meet local developers with similar interests in technology. A GDG meetup event includes talks on
                        a wide range of technical topics where you can learn new skills through hands-on workshops. The
                        community prides itself on being an inclusive environment where everyone and anyone interested
                        in tech - from beginner developers to experienced professionals - all are welcome to join. We
                        provide tools and opportunities to learn new technologies and be connected to the local
                        community, improving the local ecosystem and the quality of local talent. When you join a Google
                        Developer Group, you’ll have the opportunity to meet local developers with similar interests in
                        technology. A GDG meetup event includes talks on a wide range of technical topics where you can
                        learn new skills through hands-on workshops. The community prides itself on being an inclusive
                        environment where everyone and anyone interested in tech - from beginner developers to
                        experienced professionals - all are welcome to join. We provide tools and opportunities to learn
                        new technologies and be connected to the local community, improving the local ecosystem and the
                        quality of local talent. When you join a Google Developer Group, you’ll have the opportunity to
                        meet local developers with similar interests in technology. A GDG meetup event includes talks on
                        a wide range of technical topics where you can learn new skills through hands-on workshops. The
                        community prides itself on being an inclusive environment where everyone and anyone interested
                        in tech - from beginner developers to experienced professionals - all are welcome to join. We
                        provide tools and opportunities to learn new technologies and be connected to the local
                        community, improving the local ecosystem and the quality of local talent. When you join a Google
                        Developer Group, you’ll have the opportunity to meet local developers with similar interests in
                        technology. A GDG meetup event includes talks on a wide range of technical topics where you can
                        learn new skills through hands-on workshops. The community prides itself on being an inclusive
                        environment where everyone and anyone interested in tech - from beginner developers to
                        experienced professionals - all are welcome to join. We provide tools and opportunities to learn
                        new technologies and be connected to the local community, improving the local ecosystem and the
                        quality of local talent. When you join a Google Developer Group, you’ll have the opportunity to
                        meet local developers with similar interests in technology. A GDG meetup event includes talks on
                        a wide range of technical topics where you can learn new skills through hands-on workshops. The
                        community prides itself on being an inclusive environment where everyone and anyone interested
                        in tech - from beginner developers to experienced professionals - all are welcome to join.
                    </Typography>
                </Grid>
                <Grid className={classNames(classes.gridItem, classes.photoBoxColumn)} item>
                    <PhotoGallery photos={photos} />
                </Grid>
            </Grid>
        </Layout>
    );
};

export default IndexPage;
