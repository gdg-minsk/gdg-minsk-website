import React from 'react';
import PropTypes from 'prop-types';

import { useStaticQuery, graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';

import getSocialMediaIcon from '../../tools/social-media';

import Link from './link';

const useStyles = makeStyles(() => ({
    socialIcon: {
        width: props => props.iconSize,
        height: props => props.iconSize,
        cursor: 'pointer',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.5)',
        },
    },
}));

const SocialIcons = props => {
    const classes = useStyles(props);

    const data = useStaticQuery(graphql`
        query SocialNetwork2 {
            allMarkdownRemark(filter: { fields: { collection: { eq: "socialNetwork" } } }) {
                edges {
                    node {
                        id
                        frontmatter {
                            type
                            url
                        }
                    }
                }
            }
        }
    `);

    return (
        <>
            {data.allMarkdownRemark.edges.map(({ node }) => {
                const Icon = getSocialMediaIcon(node.frontmatter.type);

                if (!Icon) {
                    return null;
                }

                return (
                    <Link
                        className={classes.socialIcon}
                        to={node.frontmatter.url}
                        target="blank"
                        key={node.frontmatter.type}
                    >
                        <Icon />
                    </Link>
                );
            })}
        </>
    );
};

SocialIcons.defaultProps = {
    iconSize: 40,
};

SocialIcons.propTypes = {
    iconSize: PropTypes.number, // eslint-disable-line
};

export default SocialIcons;
