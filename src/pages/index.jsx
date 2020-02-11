import React, { useState, useCallback } from 'react';
import classNames from 'classnames';

import Img from 'gatsby-image/withIEPolyfill';
import { useStaticQuery, graphql } from 'gatsby';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Carousel, { Modal, ModalGateway } from 'react-images';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';

const useStyles = makeStyles(theme => ({
    pageContainer: {
        flexGrow: 1,
    },
    test1: {
        color: theme.palette.royalBlue,
    },
    gridItem: {
        width: '50%',
    },
    photoBoxColumn: {
        maxHeight: 'calc(100vh - 160px)',
        top: '50px',
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

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback(index => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

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
                    <div className={classes.photoBoxContainer}>
                        {photos.map((photoInfo, index) => {
                            const openPhoto = () => {
                                openLightbox(index);
                            };
                            return (
                                <div
                                    key={index}
                                    className={classes[`box${index}`]}
                                    onClick={openPhoto}
                                    onKeyPress={openPhoto}
                                    tabIndex="0"
                                    role="button"
                                >
                                    <Img
                                        className={classNames(classes.photo, classes[`box${index}`])}
                                        fluid={photoInfo.photo.childImageSharp.fluid}
                                        objectFit="cover"
                                        objectPosition="50% 50%"
                                        alt={photoInfo.description}
                                        loading="lazy"
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <ModalGateway>
                        {viewerIsOpen ? (
                            <Modal onClose={closeLightbox}>
                                <Carousel
                                    currentIndex={currentImage}
                                    views={photos.map(({ photo: { childImageSharp: { fluid } }, description }) => ({
                                        ...fluid,
                                        srcset: fluid.srcSet,
                                        caption: description,
                                    }))}
                                />
                            </Modal>
                        ) : null}
                    </ModalGateway>
                </Grid>
            </Grid>
        </Layout>
    );
};

export default IndexPage;
