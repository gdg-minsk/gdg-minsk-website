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
import Img from 'gatsby-image/withIEPolyfill';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons';

const ContactsPage = (): ReactElement => {
    const { width } = useWindowDimensions();

    const data = useStaticQuery(graphql`
        {
            markdownRemark(frontmatter: { templateKey: { eq: "contacts-page" } }) {
                frontmatter {
                    pageTitle
                }
            }
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
                            email
                            telegram
                            phone
                        }
                    }
                }
            }
        }
    `);

    const contacts: Contact[] = data.allMarkdownRemark.edges.map(({ node }) => {
        const {
            frontmatter: { name, photo, email, phone, telegram },
            id,
        } = node;

        return {
            id,
            name,
            photo,
            email,
            phone,
            telegram,
        };
    });
    return (
        <Layout isSocialIconsVisible={width <= MobileWidth}>
            <SEO title={data.markdownRemark.frontmatter.pageTitle} />

            <Box className="page">
                <Box className="contacts">
                    <Box className="emailInfo">
                        <Typography className="text" component="p">
                            Contact us on any questions on our email
                        </Typography>

                        <Link className={classNames('link', 'text', 'emailLink')} to="mailto:GDG@gmail.com">
                            GDG@GMAIL.COM
                        </Link>
                    </Box>

                    <Typography className="text" component="p" gutterBottom>
                        Also you can meet our heads
                    </Typography>

                    <Grid className="contactCardContainer" item>
                        {contacts.map(({ name, photo, email, telegram, phone }) => {
                            return (
                                <Box className="contactCard">
                                    <Img className="contactPhoto" fluid={(photo as any).childImageSharp.fluid} />
                                    <ul className="contactCardContent">
                                        <li>
                                            <Typography>{name}</Typography>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faEnvelope} className="contactLine" />
                                            <Link className="contactLine" to={'mailto:' + email}>
                                                {email}
                                            </Link>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faTelegramPlane} className="contactLine" />
                                            <Link className="contactLine" to={'http://telegram.me/' + telegram}>
                                                {telegram}
                                            </Link>
                                        </li>
                                        <li>
                                            <FontAwesomeIcon icon={faPhone} className="contactLine" />
                                            <Link className="contactLine" to={'tel:' + phone}>
                                                {phone}
                                            </Link>
                                        </li>
                                    </ul>
                                </Box>
                            );
                        })}
                    </Grid>

                    <Box className="socialIconsContainer">
                        <SocialIcons iconSize={105} />
                    </Box>
                </Box>
            </Box>
        </Layout>
    );
};

export default ContactsPage;
