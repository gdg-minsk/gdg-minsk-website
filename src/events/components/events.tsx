import React, { useState, useEffect, ReactElement } from 'react';

import Img from 'gatsby-image/withIEPolyfill';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Link from '../../components/shared/link';

import UserIcon from '../../../static/svg/user.svg';
import Stork from '../../../static/svg/stork.svg';

import { ALL_STREAMS } from '../../constants/streams';

import './events.scss';
import { useStaticQuery, graphql } from 'gatsby';
import { CommunityEvent, EventFilter } from '../../entities/entities';

const Events = ({ filter }: { filter: EventFilter }): ReactElement => {
    const [searchResults, setSearchResults] = useState([]);

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
                            speaker
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
        }
    `);

    const events: CommunityEvent[] = data.allMarkdownRemark.edges.map(
        ({ node }): CommunityEvent => {
            const {
                frontmatter: { name, date, speaker, description, photo, stream, place },
                id,
            } = node;

            return {
                id,
                name,
                date,
                description,
                speaker,
                photo,
                stream,
                place,
            };
        },
    );

    useEffect(() => {
        const results = events.filter(({ name, description, stream, speaker }: CommunityEvent) => {
            let included = true;
            if (filter.searchStr !== '') {
                included =
                    included &&
                    (name.toLowerCase().includes(filter.searchStr.toLowerCase()) ||
                        description.toLowerCase().includes(filter.searchStr.toLowerCase()));
            }
            if (filter.stream.current.value !== ALL_STREAMS) {
                included = included && stream === filter.stream.current.title;
            }
            if (filter.speaker.current.value !== '') {
                included = included && speaker.id === filter.speaker.current.value;
            }
            return included;
        });

        setSearchResults(results);
    }, [filter.searchStr, filter.stream.current, filter.speaker.current]);

    return (
        <>
            <Grid classes={{ container: 'pageContainer' }} container spacing={3}>
                {searchResults.map(({ id, name, date, description, speaker, photo, stream }: CommunityEvent) => {
                    return (
                        <Grid className="speakerContainer" key={id} item>
                            <div className="speakerPhotoContainer">
                                <Link to="/event">
                                    {photo ? (
                                        <Img className="speakerPhoto" fluid={(photo as any).childImageSharp.fluid} />
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
                                {date && <span className="speakerInfo">{date}</span>}
                                {description && <span className="companyInfo">{description}</span>}
                                {speaker && <span className="speakerInfo">{speaker.name}</span>}
                                {stream && <span className="speakerInfo">{stream}</span>}
                            </Box>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default Events;