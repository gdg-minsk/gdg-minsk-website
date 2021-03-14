import React, { useState, useEffect, ReactElement } from 'react';

import Img from 'gatsby-image/withIEPolyfill';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Link from '../../components/shared/link';

import UserIcon from '../../../static/svg/user.svg';
import Stork from '../../../static/svg/stork.svg';

import { ALL } from '../../constants/streams';

import './events.scss';
import { useStaticQuery, graphql } from 'gatsby';
import { CommunityEvent, EventFilter } from '../../entities/entities';
import Photo from '../../components/shared/photo';

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
                            talks {
                                speaker
                                description
                            }
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
                frontmatter: { name, date, talks, description, photo, stream, place },
                id,
            } = node;

            return {
                id,
                name,
                date,
                description,
                talks,
                photo,
                stream,
                place,
            };
        },
    );

    useEffect(() => {
        const results = events.filter(({ name, description, stream, talks }: CommunityEvent) => {
            let included = true;
            if (filter.searchStr !== '') {
                included =
                    included &&
                    (name.toLowerCase().includes(filter.searchStr.toLowerCase()) ||
                        description.toLowerCase().includes(filter.searchStr.toLowerCase()));
            }
            if (filter.stream.current.value !== ALL) {
                included = included && stream === filter.stream.current.title;
            }
            if (filter.speaker.current.value !== ALL) {
                included = included && talks.some(t => t.speaker.id === filter.speaker.current.value);
            }
            return included;
        });

        setSearchResults(results);
    }, [filter.searchStr, filter.stream.current, filter.speaker.current]);

    return (
        <>
            <Grid classes={{ container: 'pageContainer' }} container spacing={3}>
                {searchResults.map(({ id, name, date, description, talks, photoUrl, stream }: CommunityEvent) => {
                    return (
                        <Grid className="speakerContainer" key={id} item>
                            <div className="speakerPhotoContainer">
                                <Link to={`/event?eventId=${id}`}>
                                    <Photo photoUrl={photoUrl} />
                                </Link>
                            </div>
                            <Box display="flex" flexDirection="column" alignItems="center" m="10px">
                                <Link className="speakerName align-center" to="/" underline="none">
                                    {name}
                                </Link>
                                {date && <span className="speakerInfo">{date}</span>}
                                {description && <span className="companyInfo align-center">{description}</span>}
                                {talks && (
                                    <div className="speakerInfo">{talks.map(t => t.speaker.name).join(', ')}</div>
                                )}
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
