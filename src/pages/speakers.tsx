import React, { ReactElement, useState } from 'react';

import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';

import Speakers from '../speakers/components/speakers';

import { SpeakersFilter } from '../speakers/contexts/filters';
import { FluidImage } from '../constants/prop-types';
import { ALL_STREAMS } from '../constants/app';
import { Filter } from '../entities/entities';

interface Action {
    type: string;
    payload: Filter;
}

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

    const speakersFilterReducer = (state: Filter, action: Action): Filter => {
        switch (action.type) {
            case 'setEventType': {
                return { ...state, eventType: action.payload.eventType };
            }
            case 'setSearchStr': {
                return { ...state, searchStr: action.payload.searchStr };
            }
            case 'setFilters': {
                return { ...state, searchStr: action.payload.searchStr, eventType: action.payload.eventType };
            }
            case 'reset': {
                return { ...INIT_STATE };
            }
            default: {
                throw new Error(`Unhandled action type: ${action.type}`);
            }
        }
    };

    const [filter, setFilter] = useState(INIT_STATE);

    return (
        <Layout>
            <SEO title={data.markdownRemark.frontmatter.pageTitle} />
            <SpeakersFilter setFilter={setFilter} />
            <Speakers filter={filter}/>
        </Layout>
    );
};

export default SpeakersPage;
