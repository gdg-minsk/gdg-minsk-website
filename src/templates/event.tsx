import React, { ReactElement } from 'react';

import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import { CommunityEvent } from '../entities/entities';
import { graphql } from 'gatsby';



const EventPage = ({ data }): ReactElement => {
    return (
        <Layout>
            <SEO title="Event" />
            {data.allMarkdownRemark.nodes[0].id}
            <Box>
            </Box>
        </Layout>
    );
};

export default EventPage;

export const query = graphql`
query ($eventId: String) {
  allMarkdownRemark(filter: {fields: {collection: {eq: "events"}}, id: {eq: $eventId}}) {
    nodes {
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
`;