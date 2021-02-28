import React, { useState, useEffect, ReactElement } from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Link from '../../components/shared/link';

import getSocialMediaIcon from '../../tools/social-media';

import UserIcon from '../../../static/svg/user.svg';
import Stork from '../../../static/svg/stork.svg';

import { ALL } from '../../constants/streams';

import './speakers.scss';
import { Speaker, SpeakerFilter } from '../../entities/entities';
import { getCompanyInfo, isNotEmpty } from '../../tools/strings';
import NotFound from '../../components/not-found/not-found.component';
import { graphql, useStaticQuery } from 'gatsby';

const Speakers = ({ filter }: { filter: SpeakerFilter }): ReactElement => {
    const {
        stream: {
            current: { title: currentStream },
        },
        searchStr,
    } = filter;
    const [searchResults, setSearchResults] = useState([]);

    const data = useStaticQuery(
        graphql`
            {
                allContentfulSpeakers {
                    edges {
                        node {
                            company
                            fullName
                            id
                            jobTitle
                            speakerPic {
                                title
                                file {
                                    url
                                }
                            }
                            streams {
                                label
                            }
                        }
                    }
                }
            }
        `,
    );

    const speakers = data.allContentfulSpeakers.edges.map(({ node }) => {
        const {
            id,
            fullName,
            company,
            jobTitle,
            speakerPic: {
                file: { title, url },
            },
            streams,
        } = node;

        return {
            id,
            fullName,
            company,
            jobTitle,
            title,
            url,
            streams: streams.map(({ label }) => label),
        };
    });

    useEffect(() => {
        let results = speakers;
        if (currentStream.toLowerCase() !== ALL) {
            results = results.filter(({ streams }: Speaker) => {
                return !streams || streams.includes(currentStream);
            });
        }
        if (isNotEmpty(searchStr)) {
            results = results.filter(({ fullName }: Speaker) => {
                return fullName?.toLowerCase().includes(searchStr.toLowerCase());
            });
        }

        setSearchResults(results);
    }, [searchStr, currentStream]);

    return (
        <>
            <Grid classes={{ container: 'pageContainer' }} container spacing={3}>
                {!searchResults.length && <NotFound />}
                {searchResults.map(({ id, fullName, company, jobTitle, socialNetworks, url, title }) => {
                    const companyInfo = getCompanyInfo(jobTitle, company);

                    return (
                        <Grid className="speakerContainer" key={id} item>
                            <div className="speakerPhotoContainer">
                                <Link to={`/speaker?speakerId=${id}`}>
                                    {url ? (
                                        <img className="speakerPhoto" src={url} alt={title} />
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
                                <Link className="speakerName align-center" to="/" underline="none">
                                    {fullName}
                                </Link>
                                {companyInfo && <span className="companyInfo align-center">{companyInfo}</span>}

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
