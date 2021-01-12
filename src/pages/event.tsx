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
                                speaker
                                description
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

    const event = events.find(s => s.id === eventId);
    // const companyInfo = getCompanyInfo(speaker.jobTitle, speaker.company);

    return (
        <Layout>
            <SEO title="Event" />

            <Box className="speakerBoxContainer">
                {event.talks.map(talk => {
                    return (
                        <Grid key={talk.id} className="speakerContainer shadow-darken10 bg-white relative hmin360 pl210 align-l" item>
                            <Box display="flex" flexDirection="column" alignItems="left" m="10px">
                                <h3 className="speakerName">{talk.name}</h3>
                            </Box>
                        </Grid>
                    );
                })}
            </Box>
        </Layout>
    );
};

export default SpeakerPage;
