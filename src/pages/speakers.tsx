import React, { ReactElement, useState } from 'react';

import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';

import Speakers from '../speakers/components/speakers';

import { SpeakersFilter } from '../speakers/components/speakersFilters';
import { SpeakerFilter } from '../entities/entities';
import { allStreamsItem } from '../constants/streams';

const INIT_STATE: SpeakerFilter = {
    stream: { current: allStreamsItem, options: [allStreamsItem] },
    searchStr: '',
};

const SpeakersPage = (): ReactElement => {
    const { allContentfulStreams } = useStaticQuery(graphql`
        {
            allContentfulStreams {
                edges {
                    node {
                        label
                        id
                    }
                }
            }
        }
    `);
    const receivedStreams = allContentfulStreams.edges.map(({ node }) => {
        return { title: node.label, value: node.label.split(' ')[0] };
    });
    INIT_STATE.stream.options = INIT_STATE.stream.options.concat(receivedStreams);

    const [filter, setFilter] = useState(INIT_STATE);

    return (
        <Layout>
            <SEO title="Speakers" />
            <SpeakersFilter filter={filter} setFilter={setFilter} />
            <Speakers filter={filter} />
        </Layout>
    );
};

export default SpeakersPage;
