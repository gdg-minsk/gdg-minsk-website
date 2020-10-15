const _ = require('lodash');

const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.onCreateNode = ({ node, actions, getNode }) => {
    const { createNodeField } = actions;

    fmImagesToRelative(node);

    if (_.get(node, 'internal.type') === `MarkdownRemark`) {
        // Get the parent node
        const parent = getNode(_.get(node, 'parent'));

        // Create a field on this node for the "collection" of the parent
        // NOTE: This is necessary so we can filter `allMarkdownRemark` by
        // `collection` otherwise there is no way to filter for only markdown
        // documents of type `post`.
        createNodeField({
            node,
            name: 'collection',
            value: _.get(parent, 'sourceInstanceName'),
        });
    }
};

exports.createPages = async ({graphql, actions }) => {
    const { createPage } = actions;

    const data = useStaticQuery(graphql`
        {
            allMarkdownRemark(
                filter: { fields: { collection: { eq: "events" } } }
            ) {
                edges {
                    node {
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
        }
    `);

    const eventTemplate = path.resolve(`src/templates/event.tsx`);

    const events = data.allMarkdownRemark.edges.map(
        ({ node }) => {
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
        });

    events.forEach(node => {
        createPage({
            path: `/event/${node.id}`,
            component: eventTemplate,
            context: {
                communityEvent: node
            }
        });
    });
};
