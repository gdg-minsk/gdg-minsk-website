import React, { ReactElement } from 'react';

import { useStaticQuery, graphql } from 'gatsby';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';

import Speakers from '../speakers/components/speakers';

import { SpeakersFilterProvider } from '../speakers/contexts/filters';

const SpeakersPage = (): ReactElement => {
    const data = useStaticQuery(graphql`
        {
            markdownRemark(frontmatter: { templateKey: { eq: "speakers-page" } }) {
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
                            company
                            jobTitle
                            photo {
                                childImageSharp {
                                    fluid(maxWidth: 400) {
                                        ...GatsbyImageSharpFluid
                                    }
                                }
                            }
                            streams
                            socialNetworks {
                                type
                                url
                            }
                        }
                    }
                }
            }
        }
    `);

    const speakers = data.allMarkdownRemark.edges.map(({ node }) => {
        const {
            frontmatter: { name, company, jobTitle, socialNetworks, photo, streams },
            id,
        } = node;

        return {
            id,
            name,
            company,
            jobTitle,
            socialNetworks,
            photo,
            streams,
        };
    });

    return (
        <Layout>
            <SEO title={data.markdownRemark.frontmatter.pageTitle} />
            <SpeakersFilterProvider>
                <Speakers speakers={speakers} />
            </SpeakersFilterProvider>
        </Layout>
    );
};

export default SpeakersPage;
