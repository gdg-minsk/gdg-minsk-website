import React, { ReactElement } from 'react';

import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import { CommunityEvent } from '../entities/entities';
import { graphql } from 'gatsby';

const EventPage = ({ data }): ReactElement => {
    const communityEvent: CommunityEvent = data.allMarkdownRemark.nodes.map(
        (node): CommunityEvent => {
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
    )[0];

    return (
        <Layout>
            <SEO title="Event" />
            <Box>
                {communityEvent.name}
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