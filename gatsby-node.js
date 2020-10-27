const _ = require('lodash');
const path = require('path');

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

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;

    const data = await graphql(`
        {
            allMarkdownRemark(
                filter: { fields: { collection: { eq: "events" } } }
            ) {
                nodes {
                    id
                }
            }
        }
    `);

    const eventTemplate = path.resolve(`src/templates/event.tsx`);
    const events = data.data.allMarkdownRemark.nodes.map(
        (node) => node.id);

    events.forEach(nodeId => {
        createPage({
            path: `/event/${nodeId}`,
            component: eventTemplate,
            context: {
                eventId: nodeId
            }
        });
    });
};
