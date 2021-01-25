import React, { ReactElement } from 'react';

import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';

// import Link from '../components/shared/link';
// import Img from 'gatsby-image/withIEPolyfill';
// import Stork from '../../static/svg/stork.svg';
// import UserIcon from '../../static/svg/user.svg';
// import getSocialMediaIcon from '../tools/social-media';
import Grid from '@material-ui/core/Grid';
import { useQueryParam, StringParam } from 'use-query-params';
import { graphql, useStaticQuery } from 'gatsby';
// import { getCompanyInfo } from '../tools/strings';
import { CommunityEvent, Talk } from '../entities/entities';

const EventPage = (): ReactElement => {
    const [eventId] = useQueryParam('eventId', StringParam);

    const data = useStaticQuery(graphql`
        {
            markdownRemark(frontmatter: { templateKey: { eq: "events-page" } }) {
                frontmatter {
                    pageTitle
                }
            }
            allMarkdownRemark(
                filter: { fields: { collection: { eq: "events" } } }
                sort: { fields: [frontmatter___name], order: ASC }
            ) {
                edges {
                    node {
                        id
                        frontmatter {
                            name
                            date
                            talks {
                                topic
                                description
                                speaker
                            }
                            description
                            photo {
                                childImageSharp {
                                    fluid(maxWidth: 400) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                            place
                            stream
                            url
                        }
                    }
                }
            }
        }
    `);

    const events = data.allMarkdownRemark.edges.map(({ node }) => {
        const {
            frontmatter: { name, date, talks, description, photo, place, stream, url },
            id,
        } = node;

        return {
            id,
            name,
            date,
            talks,
            description,
            photo,
            place,
            stream,
            url,
        };
    });

    const event: CommunityEvent = events.find(s => s.id === eventId);
    // const companyInfo = getCompanyInfo(speaker.jobTitle, speaker.company);

    return (
        <Layout>
            <SEO title="Event" />

            <Box display="flex" flexDirection="row" className="h-full">
                <Box display="flex" flexDirection="column">
                    {!!event &&
                        event.talks.map((talk: Talk) => {
                            console.log(talk.speaker);
                            return (
                                <Grid
                                    // key={talk.speaker.name}
                                    key={talk.topic}
                                    className="talkPreview shadow-darken10 bg-white my18"
                                    item
                                >
                                    <Box display="flex" flexDirection="column" alignItems="left" margin="10px">
                                        <h3 className="talkSpeaker">{talk.speaker.name}</h3>
                                        <h3 className="talkTopic">{talk.topic}</h3>
                                    </Box>
                                </Grid>
                            );
                        })}
                </Box>
                <Box className="speakerBoxContainer">gggg</Box>
            </Box>
        </Layout>
    );
};

export default EventPage;
