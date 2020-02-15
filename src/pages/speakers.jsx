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
        width: '40px',
        height: '40px',
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

const getCompanyInfo = (jobTitle, companyName) => {
    if (!jobTitle && !companyName) {
        return null;
    }

    if (jobTitle && companyName) {
        return `${jobTitle}@${companyName}`;
    }

    return jobTitle || companyName;
};

const SpeakersPage = () => {
    const classes = useStyles();

    const data = useStaticQuery(graphql`
        query AllSpeakers {
            allMarkdownRemark(
                filter: { fields: { collection: { eq: "speakers" } } }
                sort: { fields: [frontmatter___name], order: ASC }
            ) {
                edges {
                    node {
                        frontmatter {
                            name
                            company
                            jobTitle
                            photo {
                                childImageSharp {
                                    fluid(maxWidth: 400) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                            socialNetworks {
                                type
                                url
                            }
                        }
                    }
                }
            }
        }
    `);

    return (
        <Layout>
            <SEO title="Speakers" />

            <Grid classes={{ container: classes.pageContainer }} container spacing={3}>
                {data.allMarkdownRemark.edges.map(({ node }) => {
                    const {
                        frontmatter: { name, company, jobTitle, socialNetworks, photo },
                        id,
                    } = node;

                    const companyInfo = getCompanyInfo(jobTitle, company);

                    return (
                        <Grid key={id} item>
                            <div className={classes.speakerPhotoContainer}>
                                <Link to="/speaker">
                                    <Img className={classes.speakerPhoto} fluid={photo.childImageSharp.fluid} />
                                </Link>
                            </div>
                            <Box display="flex" flexDirection="column" alignItems="center" m="10px">
                                <Link className={classes.speakerName} to="/" underline="none">
                                    {name}
                                </Link>
                                {companyInfo && <span className={classes.companyInfo}>{companyInfo}</span>}

                                {socialNetworks && (
                                    <Box display="flex">
                                        {socialNetworks.map(({ type, url }) => {
                                            const Icon = getSocialMediaIcon(type);

                                            return (
                                                <Link className={classes.socialIcon} to={url} target="blank" key={type}>
                                                    <Icon />
                                                </Link>
                                            );
                                        })}
                                    </Box>
                                )}
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </Layout>
    );
};

export default SpeakersPage;
