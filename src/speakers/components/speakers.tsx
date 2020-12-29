import React, { useState, useEffect, ReactElement } from 'react';

import Img from 'gatsby-image/withIEPolyfill';

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

    const data = useStaticQuery(graphql`
        {
            markdownRemark(frontmatter: { templateKey: { eq: "speakers-page" } }) {
                frontmatter {
                    pageTitle
                }
            }
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

    const speakers = data.allMarkdownRemark.edges.map(({ node }) => {
        const {
            frontmatter: { name, company, jobTitle, socialNetworks, photo, streams },
            id,
        } = node;

        return {
            id,
            name,
            company,
            jobTitle,
            socialNetworks,
            photo,
            streams,
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
            results = results.filter(({ name }: Speaker) => {
                return name?.toLowerCase().includes(searchStr.toLowerCase());
            });
        }

        setSearchResults(results);
    }, [searchStr, currentStream]);

    return (
        <>
            <Grid classes={{ container: 'pageContainer' }} container spacing={3}>
                {!searchResults.length && <NotFound />}
                {searchResults.map(({ id, name, company, jobTitle, socialNetworks, photo }) => {
                    const companyInfo = getCompanyInfo(jobTitle, company);

                    return (
                        <Grid className="speakerContainer" key={id} item>
                            <div className="speakerPhotoContainer">
                                <Link to={`/speaker?speakerId=${id}`}>
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
                                <Link className="speakerName align-center" to="/" underline="none">
                                    {name}
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
