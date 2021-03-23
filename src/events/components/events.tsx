import React, { useState, useEffect, ReactElement } from 'react';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Link from '../../components/shared/link';

import { ALL } from '../../constants/streams';

import './events.scss';
import { useStaticQuery, graphql } from 'gatsby';
import { CommunityEvent, EventFilter } from '../../entities/entities';
import Photo from '../../components/shared/photo';
import EventCard from '../../components/shared/event-card/event-card';

const Events = ({ filter }: { filter: EventFilter }): ReactElement => {
    const [searchResults, setSearchResults] = useState([]);

    const { allContentfulEvents } = useStaticQuery(graphql`
        {
            allContentfulEvents(sort: { fields: date, order: DESC }) {
                edges {
                    node {
                        id
                        description {
                            raw
                        }
                        eventPic {
                            file {
                                url
                                fileName
                            }
                        }
                        url
                        title
                        location
                        speakers {
                            id
                            fullName
                            company
                            speakerPic {
                                file {
                                    url
                                    fileName
                                }
                            }
                        }
                        date(formatString: "YYYY-MM-DD HH:mm")
                        streams {
                            id
                            label
                        }
                        status
                    }
                }
            }
        }
    `);

    const events: CommunityEvent[] = allContentfulEvents.edges.map(({ node }): any => {
        const {
            id,
            date,
            description: { raw },
            title,
            url,
            eventPic,
            location,
            streams,
            status,
        } = node;
        return {
            id,
            title,
            date: new Date(date),
            description: raw,
            url,
            photo: eventPic?.file,
            streams,
            location,
            status,
        };
    });

    useEffect(() => {
        const results = events.filter(({ title, description }: CommunityEvent) => {
            let included = true;
            if (filter.searchStr !== '') {
                included =
                    included &&
                    (title.toLowerCase().includes(filter.searchStr.toLowerCase()) ||
                        description.toLowerCase().includes(filter.searchStr.toLowerCase()));
            }
            // if (filter.stream.current.value !== ALL) {
            //     included = included && stream === filter.stream.current.title;
            // }
            // if (filter.speaker.current.value !== ALL) {
            //     included = included && talks.some(t => t.speaker.id === filter.speaker.current.value);
            // }
            return included;
        });

        setSearchResults(results);
    }, [filter.searchStr, filter.stream.current, filter.speaker.current]);

    return (
        <>
            <Grid classes={{ container: 'pageContainer' }} container spacing={3}>
                {searchResults.map(({ id, title, date, description, location, status }: CommunityEvent) => {
                    return (
                        <Grid className="eventContainer" key={id} item>
                            <EventCard
                                title={title}
                                date={date}
                                description={description}
                                speakers={[]}
                                key={id}
                                location={location}
                                status={status}
                            />
                        </Grid>
                        //     <div className="speakerPhotoContainer">
                        //         <Link to={`/event?eventId=${id}`}>
                        //             <Photo photoUrl={photo} />
                        //         </Link>
                        //     </div>
                        //     <Box display="flex" flexDirection="column" alignItems="center" m="10px">
                        //         <Link className="speakerName align-center" to="/" underline="none">
                        //             {title}
                        //         </Link>
                        //         {date && (
                        //             <span className="speakerInfo">
                        //                 {date.getDate()}
                        //                 {date.getMonth()}
                        //             </span>
                        //         )}
                        //         {/*description && <span className="companyInfo align-center">{description}</span>}
                        //         {talks && (
                        //             <div className="speakerInfo">{talks.map(t => t.speaker.fullName).join(', ')}</div>
                        //         )}
                        //         {stream && <span className="speakerInfo">{stream}</span>} */}
                        //     </Box>
                    );
                })}
            </Grid>
        </>
    );
};

export default Events;
