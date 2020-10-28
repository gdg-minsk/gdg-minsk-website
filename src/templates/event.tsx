import React, { ReactElement } from 'react';

import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import { CommunityEvent } from '../entities/entities';
import { graphql } from 'gatsby';
import { Typography } from '@material-ui/core';

import Img from 'gatsby-image/withIEPolyfill';

import './event.scss';

const EventPage = ({ data }: any): ReactElement => {
    const communityEvent: CommunityEvent = data.allMarkdownRemark.nodes.map(
        (node): CommunityEvent => {
            const {
                frontmatter: { name, date, speaker, description, photo, stream, place, jobTitle },
                id,
            } = node;

            let res: CommunityEvent = {
                id,
                name,
                date,
                description,
                photo,
                stream,
                place,
            };

            res.speaker = {
                id: null,
                name: speaker,
                jobTitle: jobTitle,
                photo: null,
                streams: null
            };

            return res;
        },
    )[0];

    let imgPart;

    if (communityEvent.photo) {
        imgPart = <Img className="eventPhoto" fluid={(communityEvent.photo as any).childImageSharp.fluid} />
    }

    return (
        <Layout>
            <SEO title="Event" />
            <Box className="eventCard">
                {imgPart}
                <ul className="eventCardContent">
                    <li>
                        <Typography className="eventSpeakerName">{communityEvent.speaker.name}</Typography>
                    </li>
                    <li>
                        <Typography className="eventSpeakerJobTitle">{communityEvent.speaker.jobTitle}</Typography>
                    </li>
                    <li>
                        <Typography className="eventName">{communityEvent.name}</Typography>
                    </li>
                    <li>
                        <Typography className="eventDescription">{communityEvent.description}</Typography>
                    </li>
                </ul>
            </Box>
        </Layout>
    );
};

export default EventPage;

export const query = graphql`
    query($eventId: String) {
        allMarkdownRemark(filter: { fields: { collection: { eq: "events" } }, id: { eq: $eventId } }) {
            nodes {
                id
                frontmatter {
                    name
                    date
                    speaker
                    jobTitle
                    description
                    place
                    photo {
                        childImageSharp {
                            fluid(maxWidth: 400) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                    stream
                }
            }
        }
    }
`;
