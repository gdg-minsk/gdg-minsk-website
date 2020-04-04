import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Img from 'gatsby-image/withIEPolyfill';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

import Link from '../../components/shared/link';
import DesktopFilters from './desktop-filters';
import MobileFilters from './mobile-filters';

import getSocialMediaIcon from '../../tools/social-media';
import { useWindowDimensions } from '../../hooks/window-size';

import UserIcon from '../../../static/svg/user.svg';
import Stork from '../../../static/svg/stork.svg';

import { ALL_STREAMS } from '../../constants/app';
import { MobileWidth } from '../../constants/window-sizes';
import { FluidImage } from '../../constants/prop-types';

import { useSpeakersFilterState } from '../contexts/filters';

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

    defaultSpeakerPhotoContainer: {
        display: 'flex',
        flexDirection: 'column',
        background: '#F9F8F8',
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
        textAlign: 'center',
    },

    filterWrapper: {
        position: 'sticky',
        top: '0',
        zIndex: '2',
        background: '#fff',
    },

    '@media (max-width: 600px)': {
        speakerContainer: {
            display: 'flex',
            width: '50%',
            maxWidth: '250px',
            alignItems: 'center',
            flexDirection: 'column',
        },

        speakerPhotoContainer: {
            width: '100%',
            height: 'auto',
        },

        speakerName: {
            fontSize: '20px',
            lineHeight: '23px',
        },

        companyInfo: {
            fontSize: '13px',
            lineHeight: '15px',
        },

        socialIcon: {
            width: '30px',
            height: '30px',
        },

        defaultSpeakerPhotoContainer: {
            position: 'relative',
            width: '100%',

            '&:before': {
                content: "''",
                display: 'block',
                paddingTop: '100%',
            },
        },
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

const Speakers = ({ speakers }) => {
    const classes = useStyles();

    const { width } = useWindowDimensions();
    const { eventType, searchStr } = useSpeakersFilterState();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const results = speakers.filter(({ name, streams }) => {
            if (eventType === ALL_STREAMS) {
                return name.toLowerCase().includes(searchStr.toLowerCase());
            }

            if (!streams) {
                return false;
            }

            return name.toLowerCase().includes(searchStr.toLowerCase()) && streams.includes(eventType);
        });

        setSearchResults(results);
    }, [speakers, searchStr, eventType]);

    return (
        <>
            <Box className={classes.filterWrapper}>{width > MobileWidth ? <DesktopFilters /> : <MobileFilters />}</Box>

            <Grid classes={{ container: classes.pageContainer }} container spacing={3}>
                {searchResults.map(({ id, name, company, jobTitle, socialNetworks, photo }) => {
                    const companyInfo = getCompanyInfo(jobTitle, company);

                    return (
                        <Grid className={classes.speakerContainer} key={id} item>
                            <div className={classes.speakerPhotoContainer}>
                                <Link to="/speaker">
                                    {photo ? (
                                        <Img className={classes.speakerPhoto} fluid={photo.childImageSharp.fluid} />
                                    ) : (
                                        <Box className={classes.defaultSpeakerPhotoContainer}>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                position="absolute"
                                                width="100%"
                                                height="100%"
                                            >
                                                <Box display="flex" justifyContent="flex-end">
                                                    <Stork height="40" />
                                                </Box>

                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                    alignItems="center"
                                                    flexGrow="1"
                                                >
                                                    <UserIcon height="155" />
                                                </Box>
                                            </Box>
                                        </Box>
                                    )}
                                </Link>
                            </div>
                            <Box display="flex" flexDirection="column" alignItems="center" m="10px">
                                <Link className={classes.speakerName} to="/" underline="none">
                                    {name}
                                </Link>
                                {companyInfo && <span className={classes.companyInfo}>{companyInfo}</span>}

                                {socialNetworks && (
                                    <Box display="flex" flexWrap="wrap">
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
        </>
    );
};

Speakers.propTypes = {
    speakers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            company: PropTypes.string,
            jobTitle: PropTypes.string,
            socialNetworks: PropTypes.arrayOf(
                PropTypes.shape({
                    type: PropTypes.string.isRequired,
                    url: PropTypes.string.isRequired,
                }),
            ),
            streams: PropTypes.arrayOf(PropTypes.string),
            photo: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                    fluid: FluidImage,
                }),
            }),
        }),
    ).isRequired,
};

export default Speakers;
