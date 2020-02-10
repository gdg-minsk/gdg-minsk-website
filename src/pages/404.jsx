import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Link from '../components/shared/link';

const useStyles = makeStyles(() => ({
    pageContainer: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 600,
        textTransform: 'uppercase',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 900,
        fontSize: '200px',
        lineHeight: '234px',
        color: '#3372DF',
        margin: 0,
    },
    description: {
        fontWeight: 300,
        fontSize: '48px',
        lineHeight: '56px',
        color: '#979797',
        margin: '42px 0 0 0',
    },
    btn: {
        boxShadow: '5px 5px 12px rgba(51, 114, 223, 0.5)',
        fontWeight: 'bold',
        fontSize: '24px',
        lineHeight: '28px',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        alignSelf: 'flex-start',
        marginTop: '42px',
        padding: '23px 15px',
        backgroundColor: '#3372DF',
        '&:hover': { backgroundColor: '#3e5a8a' },
    },
    '@media (max-width: 600px)': {
        pageContainer: {
            alignItems: 'center',
        },
        description: {
            fontSize: '30px',
            lineHeight: '35px',
            textAlign: 'center',
        },
        btn: {
            width: '100%',
            fontSize: '21px',
        },
    },
}));

const NotFoundPage = () => {
    const classes = useStyles();

    const data = useStaticQuery(graphql`
        query NotFoundData {
            markdownRemark(frontmatter: { templateKey: { eq: "not-found-page" } }) {
                frontmatter {
                    pageTitle
                    title
                    description
                    btnText
                }
            }
        }
    `);

    const {
        markdownRemark: {
            frontmatter: { pageTitle, title, description, btnText },
        },
    } = data;

    return (
        <Layout>
            <SEO title={pageTitle} />

            <Box className={classes.pageContainer}>
                <h1 className={classes.title}>{title}</h1>
                <p className={classes.description}>{description}</p>

                <Link to="/" className={classes.logoLink} underline="none">
                    <Button className={classes.btn} variant="contained">
                        {btnText}
                    </Button>
                </Link>
            </Box>
        </Layout>
    );
};

export default NotFoundPage;
