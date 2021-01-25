import React, { ReactElement } from 'react';

import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';

import Link from '../components/shared/link';
import Img from 'gatsby-image/withIEPolyfill';
import Stork from '../../static/svg/stork.svg';
import UserIcon from '../../static/svg/user.svg';
import getSocialMediaIcon from '../tools/social-media';
import Grid from '@material-ui/core/Grid';
import { useQueryParam, StringParam } from 'use-query-params';
import { graphql, useStaticQuery } from 'gatsby';
import { getCompanyInfo } from '../tools/strings';

const SpeakerPage = (): ReactElement => {
    const [speakerId] = useQueryParam('speakerId', StringParam);

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
                            description
                        }
                    }
                }
            }
        }
    `);

    const speakers = data.allMarkdownRemark.edges.map(({ node }) => {
        const {
            frontmatter: { name, company, jobTitle, socialNetworks, photo, streams, description },
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
            description,
        };
    });

    const speaker = speakers.find(s => s.id === speakerId);
    const companyInfo = !!speaker && getCompanyInfo(speaker.jobTitle, speaker.company);

    return (
        <Layout>
            <SEO title="Speaker" />

            <Box className="speakerBoxContainer">
                {!!speaker && (
                    <Grid className="speakerContainer shadow-darken10 bg-white relative hmin360 pl210 align-l" item>
                        <div className="speakerPhotoContainer flying">
                            {speaker.photo ? (
                                <Img className="speakerPhoto" fluid={speaker.photo.childImageSharp.fluid} />
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

                                        <Box display="flex" justifyContent="center" alignItems="center" flexGrow="1">
                                            <UserIcon height="155" />
                                        </Box>
                                    </Box>
                                </Box>
                            )}
                        </div>
                        <Box display="flex" flexDirection="column" alignItems="left" m="10px">
                            <h3 className="speakerName">{speaker.name}</h3>

                            {companyInfo && <span className="companyInfo">{companyInfo}</span>}

                            {speaker.description && (
                                <Box display="flex" flexWrap="wrap">
                                    {speaker.description}
                                </Box>
                            )}

                            {speaker.streams && (
                                <Box display="flex" flexWrap="wrap">
                                    {speaker.streams.map(stream => {
                                        return (
                                            <span key={stream} className="chip">
                                                {stream}
                                            </span>
                                        );
                                    })}
                                </Box>
                            )}

                            {speaker.socialNetworks && (
                                <Box display="flex" flexWrap="wrap">
                                    {speaker.socialNetworks.map(({ type, url }) => {
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
                )}
            </Box>
        </Layout>
    );
};

export default SpeakerPage;
