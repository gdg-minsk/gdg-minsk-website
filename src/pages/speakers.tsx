import React, { ReactElement, useState } from 'react';

import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';

import Speakers from '../speakers/components/speakers';

import { SpeakersFilter } from '../speakers/components/speakersFilters';
import { SpeakerFilter } from '../entities/entities';
import streams from '../constants/streams';

const INIT_STATE: SpeakerFilter = {
    stream: { current: streams[0], options: streams },
    searchStr: '',
};

const SpeakersPage = (): ReactElement => {
    const data = useStaticQuery(graphql`
        {
            markdownRemark(frontmatter: { templateKey: { eq: "speakers-page" } }) {
                frontmatter {
                    pageTitle
                }
            }
        }
    `);

    const [filter, setFilter] = useState(INIT_STATE);

    return (
        <Layout>
            <SEO title={data.markdownRemark.frontmatter.pageTitle} />
            <SpeakersFilter filter={filter} setFilter={setFilter} />
            <Speakers filter={filter} />
        </Layout>
    );
};

export default SpeakersPage;
