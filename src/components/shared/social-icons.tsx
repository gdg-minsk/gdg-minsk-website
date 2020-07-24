import React from 'react';
import PropTypes from 'prop-types';

import { useStaticQuery, graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';

import getSocialMediaIcon from '../../tools/social-media';

import Link from './link';

const useStyles = makeStyles(() => ({
    socialIcon: {
        width: (props: Props) => props.iconSize,
        height: (props: Props) => props.iconSize,
        cursor: 'pointer',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.5)',
        },
    },
}));

interface Props {
    iconSize: number;
}

const SocialIcons = (props: Props): ReactElement => {
    const classes = useStyles(props);

    const data = useStaticQuery(graphql`
        query SocialNetwork {
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

                return (
                    <Link
                        aria-label={node.frontmatter.type}
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

export default SocialIcons;
