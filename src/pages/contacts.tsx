import React, { ReactElement } from 'react';
import classNames from 'classnames';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Link from '../components/shared/link';
import SocialIcons from '../components/shared/social-icons';

import { useWindowDimensions } from '../hooks/window-size';

import { MobileWidth } from '../constants/window-sizes';
import './contacts.scss';
import { graphql, useStaticQuery } from 'gatsby';
import { Contact } from '../entities/entities';
import { Grid } from '@material-ui/core';



const ContactsPage = (): ReactElement => {
    const { width } = useWindowDimensions();

    const data = useStaticQuery(graphql`
    {
        allMarkdownRemark(
            filter: { fields: { collection: { eq: "contacts" } } }
            sort: { fields: [frontmatter___name], order: ASC }
        ) {
            edges {
                node {
                    id
                    frontmatter {
                        name
                        photo {
                            childImageSharp {
                                fluid(maxWidth: 400) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`);

    const contacts: Contact[] = data.allMarkdownRemark.edges.map(({ node }) => {
        const {
            frontmatter: { name, photo },
            id,
        } = node;

        return {
            id,
            name,
            photo
        };
    });
    return (
        <Layout isSocialIconsVisible={width <= MobileWidth}>
            <SEO title="Contacts" />

            <Box className='page'>
                <Box className='contacts'>
                    <Box className='emailInfo'>
                        <Typography className='text' component="p">
                            Contact us on any questions on our email
                        </Typography>

                        <Link
                            className={classNames('link', 'text', 'emailLink')}
                            to="mailto:GDG@gmail.com"
                        >
                            GDG@GMAIL.COM
                        </Link>
                    </Box>

                    <Typography className='text' component="p" gutterBottom>
                        Also you can meet our heads
                    </Typography>

                    <Grid className="speakerContainer" item>
                        {contacts.map(({ name, photo }) => {
                            return (
                                <Box className='contactCard'>
                                    <Typography>{name}</Typography>
                                    <Link className='contactLine' to='mailto:test@test.ru'>test@test.ru</Link>
                                    <Link className='contactLine' to='telegram.me/@groupname'>@telega</Link>
                                    <Link className='contactLine' to='tel:351531'>8 800 555 35 35</Link>
                                </Box>);
                        })}
                    </Grid>

                    <Box className='socialIconsContainer'>
                        <SocialIcons iconSize={105} />
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default ContactsPage;
