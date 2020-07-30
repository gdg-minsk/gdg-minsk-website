import React, { useState, useEffect, ReactElement } from 'react';

import Img from 'gatsby-image/withIEPolyfill';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

import Link from '../../components/shared/link';
import DesktopFilters from './desktop-filters';
import MobileFilters from './mobile-filters';

import getSocialMediaIcon from '../../tools/social-media';

import UserIcon from '../../../static/svg/user.svg';
import Stork from '../../../static/svg/stork.svg';

import { ALL_STREAMS } from '../../constants/app';
import { FluidImage } from '../../constants/prop-types';

import { useSpeakersFilterState } from '../contexts/filters';

import './speakers.scss';

const getCompanyInfo = (jobTitle, companyName): any => {
    if (!jobTitle && !companyName) {
        return null;
    }

    if (jobTitle && companyName) {
        return `${jobTitle}@${companyName}`;
    }

    return jobTitle || companyName;
};

interface SocialNetwork {
    type: string;
    url: string;
}

interface Speaker {
    id: string;
    name: string;
    company?: string;
    jobTitle?: string;
    socialNetworks?: SocialNetwork[];
    photo: typeof FluidImage;
    streams: string[];
}

interface Speakers {
    speakers: Speaker[];
}

const Speakers = ({ speakers }: Speakers): ReactElement => {
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
            <Box className="filterWrapper">
                <Hidden xsDown>
                    <DesktopFilters />
                </Hidden>

                <Hidden smUp>
                    <MobileFilters />
                </Hidden>
            </Box>

            <Grid classes={{ container: 'pageContainer' }} container spacing={3}>
                {searchResults.map(({ id, name, company, jobTitle, socialNetworks, photo }) => {
                    const companyInfo = getCompanyInfo(jobTitle, company);

                    return (
                        <Grid className="speakerContainer" key={id} item>
                            <div className="speakerPhotoContainer">
                                <Link to="/speaker">
                                    {photo ? (
                                        <Img className="speakerPhoto" fluid={photo.childImageSharp.fluid} />
                                    ) : (
                                        <Box className="defaultSpeakerPhotoContainer">
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
                                <Link className="speakerName" to="/" underline="none">
                                    {name}
                                </Link>
                                {companyInfo && <span className="companyInfo">{companyInfo}</span>}

                                {socialNetworks && (
                                    <Box display="flex" flexWrap="wrap">
                                        {socialNetworks.map(({ type, url }) => {
                                            const Icon = getSocialMediaIcon(type);

                                            return (
                                                <Link className="socialIcon" to={url} target="blank" key={type}>
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

export default Speakers;
