import React, { ReactElement, useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import { EventFilter, ListItem } from '../entities/entities';
import streams, { ALL } from '../constants/streams';
import EventsFilter from '../events/components/eventsFilter';
import Events from '../events/components/events';

const INIT_STATE: EventFilter = {
    stream: { current: streams[0], options: streams },
    speaker: { current: { value: '', title: '' }, options: [] },
    searchStr: '',
};

const EventPage = (): ReactElement => {
    const data = useStaticQuery(graphql`
        {
            markdownRemark(frontmatter: { templateKey: { eq: "events-page" } }) {
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
                        }
                    }
                }
            }
        }
    `);

    const speakers: ListItem[] = data.allMarkdownRemark.edges.map(
        ({ node }): ListItem => {
            const {
                frontmatter: { name },
                id,
            } = node;
            return { value: id, title: name };
        },
    );

    INIT_STATE.speaker.options = [
        {
            title: 'All',
            value: ALL,
        },
        ...speakers,
    ];
    const [filter, setFilter] = useState(INIT_STATE);

    return (
        <Layout>
            <SEO title={data.markdownRemark.frontmatter.pageTitle} />
            <EventsFilter filter={filter} setFilter={setFilter} />
            <Events filter={filter} />
        </Layout>
    );
};

export default EventPage;
