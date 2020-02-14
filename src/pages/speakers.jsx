import React from 'react';

import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Link from '../components/shared/link';
import getSocialMediaIcon from '../tools/social-media';

const useStyles = makeStyles(() => ({
    pageContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        fontFamily: 'Roboto',
    },
    socialIcon: {
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.5)',
        },
    },
    speakerPhotoContainer: {
        width: '280px',
        height: '310px',
        position: 'relative',
        overflow: 'hidden',
        '&:before': {
            position: 'absolute',
            top: '0',
            left: '-85%',
            zIndex: '2',
            display: 'block',
            content: "''",
            width: '50%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,.3) 100%)',
            WebkitTransform: 'skewX(-25deg)',
            transform: 'skewX(-25deg)',
        },
        '&:hover::before': {
            animation: '$shine .75s',
            animationName: '$shine',
        },
    },

    '@keyframes shine': {
        '100%': {
            left: '125%',
        },
    },

    speakerPhoto: {
        width: '100%',
        height: '100%',
        borderRadius: '10px',
        cursor: 'pointer',
    },
    speakerName: {
        fontSize: '25px',
        lineHeight: '30px',
        textAlign: 'center',
        textTransform: 'capitalize',
        color: '#000000',
    },

    companyInfo: { fontSize: '15px', lineHeight: '18px', color: '#7F8388', marginTop: '5px' },
}));

const SpeakersPage = () => {
    const classes = useStyles();

    const data = useStaticQuery(graphql`
        query {
            placeholderImage: file(relativePath: { eq: "IlyaZaprutski.jpg" }) {
                childImageSharp {
                    fluid(maxWidth: 310) {
                        ...GatsbyImageSharpFluid
                    }
                }
            }
        }
    `);

    return (
        <Layout>
            <SEO title="Speakers" />

            <Grid classes={{ container: classes.pageContainer }} container spacing={3}>
                {[...Array(21).keys()].map((value, index) => (
                    <Grid key={index} item>
                        <div className={classes.speakerPhotoContainer}>
                            <Link to="/speaker">
                                <Img
                                    className={classes.speakerPhoto}
                                    fluid={data.placeholderImage.childImageSharp.fluid}
                                />
                            </Link>
                        </div>
                        <Box display="flex" flexDirection="column" alignItems="center" m="10px">
                            <Link className={classes.speakerName} to="/" underline="none">
                                Илья Запруцкий
                            </Link>
                            <span className={classes.companyInfo}>Team Lead @iTechArt</span>
                            <Box display="flex">
                                {[...Array(6)].map((x, index2) => {
                                    const Icon = getSocialMediaIcon('twitter');

                                    return (
                                        <Link
                                            className={classes.socialIcon}
                                            to="https://www.onliner.by"
                                            target="blank"
                                            key={index2}
                                        >
                                            <Icon />
                                        </Link>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    );
};

export default SpeakersPage;
