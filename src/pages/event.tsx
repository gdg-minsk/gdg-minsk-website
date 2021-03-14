import React, { ReactElement, useState, useMemo, useCallback } from 'react';

import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Grid from '@material-ui/core/Grid';
import { useQueryParam, StringParam } from 'use-query-params';
import { graphql, useStaticQuery } from 'gatsby';
import { CommunityEvent, Talk } from '../entities/entities';
import Typography from '@material-ui/core/Typography';
import getEventMonth from '../tools/months';
import { getCompanyInfo } from '../tools/strings';
import Lister from '../components/shared/lister/lister';
import Photo from '../components/shared/photo';
import Link from '../components/shared/link';
import getSocialMediaIcon from '../tools/social-media';

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
    let eventDate = new Date();

    // TODO: load event with talks
    if (event) {
        eventDate = new Date(event.date);
        event.talks = [
            {
                id: '1',
                speaker: { id: 1, fullName: 'Speaker 1', jobTitle: 'Lead', company: 'AwesomeSoft' } as any,
                topic: 'Talk 1',
                description: 'Description 1',
            },
            {
                id: '2',
                speaker: { id: 2, fullName: 'Speaker 2', jobTitle: 'Dev', company: 'CoolSoft' } as any,
                topic: 'Talk 2',
                description: 'Description 2',
            },
        ];
    }

    const [selectedTalkIndex, setSelectedTalkIndex] = useState(0);
    const selectedTalk = useMemo(() => event.talks[selectedTalkIndex], [selectedTalkIndex]);

    const nextTalkHandler = useCallback(() => {
        if (selectedTalkIndex < event.talks.length - 1) {
            setSelectedTalkIndex(selectedTalkIndex + 1);
        } else {
            setSelectedTalkIndex(0);
        }
    }, [selectedTalkIndex]);
    const prevTalkHandler = useCallback(() => {
        if (selectedTalkIndex > 0) {
            setSelectedTalkIndex(selectedTalkIndex - 1);
        } else {
            setSelectedTalkIndex(event.talks.length - 1);
        }
    }, [selectedTalkIndex]);

    const speaker = useMemo(() => event.talks[selectedTalkIndex].speaker, [selectedTalkIndex]);
    const companyInfo = useMemo(() => getCompanyInfo(speaker.jobTitle, speaker.company), [selectedTalkIndex]);

    return (
        <Layout>
            <SEO title="Event" />
            {!!event && (
                <>
                    <Box display="flex" flexGrow={1} borderRadius="10px" boxShadow="5px 5px 20px #D1D1D1">
                        <Box alignItems="center" display="flex" flexGrow={1} padding="15px 0 15px 15px">
                            <Box>
                                <Typography align="center" color="textSecondary">
                                    {eventDate.getDate()}
                                </Typography>
                                <Typography align="center" color="textSecondary">
                                    {getEventMonth(eventDate)}
                                </Typography>
                            </Box>
                            <Box flexGrow={1} margin="0 30px">
                                <Typography color="textSecondary">{event.place}</Typography>
                                <Typography>{event.name}</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box display="flex" flexDirection="row" className="h-full">
                        <Box display="flex" flexDirection="column">
                            {event.talks.map((talk: Talk, index: number) => {
                                return (
                                    !!talk && (
                                        <Grid key={index} className="talkPreview shadow-darken10 bg-white my18" item>
                                            <Box
                                                display="flex"
                                                flexDirection="column"
                                                alignItems="left"
                                                margin="10px"
                                                onClick={() => setSelectedTalkIndex(index)}
                                            >
                                                <h3 className="talkSpeaker">{talk.speaker.fullName}</h3>
                                                <h3 className="talkTopic">{talk.topic}</h3>
                                            </Box>
                                        </Grid>
                                    )
                                );
                            })}
                        </Box>
                        <Box>
                            <Grid className="talkPreview shadow-darken10 mx24 bg-white my18 w-full hmin360 wmin360 relative">
                                <Box display="flex" flexDirection="column" alignItems="left" margin="10px">
                                    <h3 className="speakerName">{speaker.fullName}</h3>
                                    {companyInfo && <span className="companyInfo">{companyInfo}</span>}

                                    <div>
                                        <Photo photoUrl={speaker.speackerPic} />
                                    </div>


                                    <Lister
                                        label="Talks"
                                        currentIndex={selectedTalkIndex}
                                        listLength={event.talks.length}
                                        onNextClick={nextTalkHandler}
                                        onPrevClick={prevTalkHandler}
                                        className="my18 absolute right bottom mb60"
                                    />
                                </Box>
                            </Grid>
                        </Box>
                    </Box>
                </>
            )}
        </Layout>
    );
};

export default EventPage;
