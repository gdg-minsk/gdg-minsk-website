import React, { ReactElement, useState } from 'react';

import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';

import Speakers from '../speakers/components/speakers';

import { SpeakersFilter } from '../speakers/contexts/filters';
import { ALL_STREAMS } from '../constants/app';
import { Filter } from '../entities/entities';

const INIT_STATE: Filter = {
    eventType: ALL_STREAMS,
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
