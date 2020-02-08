import React from 'react';
import PropTypes from 'prop-types';

import { useStaticQuery, graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import getSocialMediaIcon from '../../../../tools/social-media';

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2),
        marginTop: 'auto',
        zIndex: 2,
    },
    socialIcon: {
        width: '40px',
        height: '40px',
        cursor: 'pointer',
        marginRight: '3px',
        transition: 'transform .2s',
        '&:hover': {
            transform: 'scale(1.5)',
        },
    },
    '@media (max-width: 550px)': {
        footer: {
            backgroundColor: '#fff',
        },
        socialIconsContainer: {
            justifyContent: 'center',
        },
    },
}));

const Footer = () => {
    const classes = useStyles();

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
        <footer className={classes.footer}>
            <Container maxWidth="lg">
                <Box display="flex" className={classes.socialIconsContainer}>
                    {data.allMarkdownRemark.edges.map(({ node }) => {
                        const Icon = getSocialMediaIcon(node.frontmatter.type);

                        if (!Icon) {
                            return null;
                        }

                        return (
                            <Link
                                className={classes.socialIcon}
                                href={node.frontmatter.url}
                                target="blank"
                                key={node.frontmatter.type}
                            >
                                <Icon />
                            </Link>
                        );
                    })}
                </Box>
            </Container>
        </footer>
    );
};

export default Footer;
