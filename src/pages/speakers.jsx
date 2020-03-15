import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';

import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image/withIEPolyfill';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Link from '../components/shared/link';
import getSocialMediaIcon from '../tools/social-media';

import { Streams } from '../constants/app';

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

    companyInfo: {
        fontSize: '15px',
        lineHeight: '18px',
        color: '#7F8388',
        marginTop: '5px',
    },

    filterContainer: {
        display: 'flex',
        boxShadow: '5px 5px 20px #D1D1D1',
        borderRadius: '10px',
        marginBottom: '20px',
        position: 'sticky',
        top: '70px',
        width: '100%',
        zIndex: '10',
        background: '#fff',
        padding: '15px 20px',
    },
    searchOptionText: {
        fontSize: '14px',
        lineHeight: '16px',
    },
    searchItemLabel: {
        textTransform: 'uppercase',
        color: '#000000',
        marginRight: '10px',
        flexShrink: '0',
    },
    searchInputWrapper: {
        background: '#FFFFFF',
        border: '1px solid #EFEFEF',
        borderRadius: '5px',
    },
    streamSelectInput: {
        padding: '12px 10px',
        minWidth: '150px',
        textTransform: 'uppercase',
    },
    searchByNameInput: {
        padding: '12px 10px',
    },
    dropdownItem: {
        textTransform: 'uppercase',
        fontSize: '14px',
        lineHeight: '16px',
    },
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

const ALL_STREAMS = 'all';

const SpeakersPage = () => {
    const classes = useStyles();

    const [searchStr, setSearchStr] = useState('');
    const [eventType, setEventType] = useState(ALL_STREAMS);
    const [searchResults, setSearchResults] = useState([]);

    const data = useStaticQuery(graphql`
        query AllSpeakers {
            allMarkdownRemark(
                filter: { fields: { collection: { eq: "speakers" } } }
                sort: { fields: [frontmatter___name], order: ASC }
            ) {
                edges {
                    node {
                        id
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
                            streams
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

    const handleSearchStrChange = useCallback(event => {
        setSearchStr(event.target.value);
    }, []);
    const handleEventTypeChange = useCallback(event => {
        setEventType(event.target.value);
    }, []);

    useEffect(() => {
        const results = data.allMarkdownRemark.edges.filter(
            ({
                node: {
                    frontmatter: { name, streams },
                },
            }) => {
                if (eventType === ALL_STREAMS) {
                    return name.toLowerCase().includes(searchStr.toLowerCase());
                }

                if (!streams) {
                    return false;
                }

                return name.toLowerCase().includes(searchStr.toLowerCase()) && streams.includes(eventType);
            },
        );

        setSearchResults(results);
    }, [searchStr, eventType]);

    return (
        <Layout>
            <SEO title="Speakers" />

            <Box className={classes.filterContainer}>
                <Box display="flex" alignItems="center" flexGrow={1} marginRight="40px">
                    <InputLabel
                        className={classNames(classes.searchItemLabel, classes.searchOptionText)}
                        htmlFor="searchByNameInput"
                    >
                        speaker full name
                    </InputLabel>
                    <InputBase
                        id="searchByNameInput"
                        className={classNames(classes.searchInputWrapper, classes.searchOptionText)}
                        classes={{ input: classes.searchByNameInput }}
                        placeholder="Type any words to start search"
                        onChange={handleSearchStrChange}
                        inputProps={{ 'aria-label': 'search by name' }}
                        fullWidth
                    />
                </Box>

                <Box display="flex" alignItems="center">
                    <InputLabel
                        className={classNames(classes.searchItemLabel, classes.searchOptionText)}
                        htmlFor="searchByStreamSelect"
                    >
                        Stream
                    </InputLabel>

                    <Select
                        id="searchByStreamSelect"
                        value={eventType}
                        onChange={handleEventTypeChange}
                        input={
                            <InputBase
                                className={classNames(classes.searchInputWrapper, classes.searchOptionText)}
                                classes={{ input: classes.streamSelectInput }}
                            />
                        }
                    >
                        <MenuItem classes={{ root: classes.dropdownItem }} value={ALL_STREAMS}>
                            All
                        </MenuItem>
                        <MenuItem classes={{ root: classes.dropdownItem }} value={Streams.WEB}>
                            Web Meetup
                        </MenuItem>
                        <MenuItem classes={{ root: classes.dropdownItem }} value={Streams.MOBILE}>
                            Mobile Meetup
                        </MenuItem>
                        <MenuItem classes={{ root: classes.dropdownItem }} value={Streams.CLOUD}>
                            Cloud Meetup
                        </MenuItem>
                    </Select>
                </Box>
            </Box>

            <Grid classes={{ container: classes.pageContainer }} container spacing={3}>
                {searchResults.map(({ node }) => {
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
