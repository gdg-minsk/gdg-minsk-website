import React, { ReactElement } from 'react';
import PropTypes, { any } from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import getEventMonth from '../../../tools/months';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import Link from '../link';
import { Box, Button } from '@material-ui/core';
import classNames from 'classnames';

const useStyles = makeStyles({
    cardImg: {
        height: 189,
    },
    infoButton: {
        color: '#fff',
        backgroundColor: '#3372DF',
        fontSize: 14,
        marginTop: 25,
        width: '100%',
        borderRadius: 5,
        textAlign: 'center',
        textTransform: 'uppercase',
        paddingTop: 13,
        paddingBottom: 13,
    },
    passed: {
        fontSize: 21,
        textTransform: 'uppercase',
        color: '#599B5C',
    },
    upcomming: {
        fontSize: 21,
        textTransform: 'uppercase',
        color: '#3372DF',
    },
    avatar: {
        marginRight: 10,
        width: 25,
        height: 25,
        fontSize: 13,
    },
    button: {
        height: '100%',
        borderRadius: '0 10px 10px 0',
    },
    date: {
        display: 'flex',
        width: 170,
        flexDirection: 'column',
        alignItems: 'center',
    },
    description: {
        fontSize: 18,
        colot: '#000',
        fontWeight: 400,
    },
    day: {
        marginTop: 20,
        fontSize: 72,
        fontWeight: 300,
        lineHeight: 'normal',
    },
    month: {
        fontWeight: 400,
        fontSize: 24,
        textTransform: 'uppercase',
        marginTop: '-10px',
    },
    event: {
        fontSize: 32,
        fontWeight: 500,
        color: '#0B478E',
        lineHeight: '32px',
        marginTop: 10,
        marginBottom: 15,
    },
    place: {
        fontSize: 21,
        fontWeight: 400,
        color: '#6D7278',
    },

    '@media (max-width: 960px)': {
        event: {
            fontSize: 17,
        },
        place: {
            fontSize: 16,
        },
        day: {
            fontSize: 35,
            lineHeight: '35px',
        },
        month: {
            fontSize: 20,
        },
        buttonContainer: {
            display: 'none',
        },
    },
});

const EventCard = ({ imageUrl, imageTitle, title, description, date, speakers, location, status }): ReactElement => {
    const classes = useStyles();
    const listItems = speakers.map(speaker => (
        <Link key={speaker.id} to="/speaker" underline="none">
            <Tooltip title={`${speaker.firstName} ${speaker.lastName}`}>
                {speaker.avatar ? (
                    <Avatar
                        alt={`${speaker.firstName} ${speaker.lastName}`}
                        src={speaker.avatar}
                        className={classes.avatar}
                    />
                ) : (
                    <Avatar className={classes.avatar}>
                        {`${speaker.firstName.charAt(0)} ${speaker.lastName.charAt(0)}`}
                    </Avatar>
                )}
            </Tooltip>
        </Link>
    ));

    return (
        <Box display="flex" flexGrow={1} borderRadius="10px" boxShadow="5px 5px 20px #D1D1D1" bgcolor="#fff">
            <Box display="flex" flexGrow={1} padding="50px 20px">
                <Box className={classes.date}>
                    <Typography
                        className={status ? classes.upcomming : classes.passed }
                        align="center"
                        color="textSecondary"
                    >
                        {status ? 'upcomming' : 'passed'}
                    </Typography>
                    <Typography className={classes.day} align="center" color="textSecondary">
                        {date.getDate()}
                    </Typography>
                    <Typography className={classes.month} align="center" color="textSecondary">
                        {getEventMonth(date)}
                    </Typography>
                    {/* TODO: Need to put here slug */}
                    <Link to="/" className={classes.infoButton}>
                        {status ? 'join event' : 'View report'}
                    </Link>
                </Box>
                <Box flexGrow={1} margin="0 30px">
                    <Typography className={classes.place} color="textSecondary">
                        {location}
                    </Typography>
                    <Typography className={classes.event}>{title}</Typography>
                    <Typography className={classes.description}>
                        {JSON.parse(description).content[0].content[0].value}
                    </Typography>
                </Box>
            </Box>
            {/* <Link href={url} target="blank" className={styles.buttonContainer}>
                <Button className={styles.button} variant="contained" color="primary">
                    <ArrowForwardIosIcon />
                </Button>
            </Link> */}
        </Box>
    );
};

EventCard.propTypes = {
    imageUrl: PropTypes.string,
    imageTitle: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    speakers: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            avatar: PropTypes.string,
        }),
    ),
    location: PropTypes.string,
    date: any,
    status: PropTypes.bool,
};

EventCard.defaultProps = {
    imageUrl: '/img/gdg-cover.png',
    speakers: [],
    imageTitle: 'GDG Event',
    date: '',
};

export default EventCard;
