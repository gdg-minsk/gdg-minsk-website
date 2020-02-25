import React from 'react';

import { useStaticQuery, graphql } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

import getSocialMediaIcon from '../../../../tools/social-media';

const useStyles = makeStyles(() => ({
    footer: {
        padding: '9px 0',
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
    '@media (max-width: 600px)': {
        footer: {
            backgroundColor: '#fff',
            borderTop: '1px solid #EFEFEF',
<<<<<<< HEAD
=======
            marginTop: '45px',
>>>>>>> master
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
