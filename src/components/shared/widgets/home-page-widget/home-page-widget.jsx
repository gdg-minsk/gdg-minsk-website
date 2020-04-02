import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles({
    root: {
        boxShadow: '5px 5px 20px #D1D1D1',
        borderRadius: 10,
    },
    eventDesc: {
        margin: '0 30px',
    },
    description: {
        padding: '15px 0 15px 15px',
    },
    day: {
        fontSize: 50,
        lineHeight: '50px',
    },
    month: {
        fontSize: 24,
    },
    event: {
        fontSize: 31,
        fontWeight: 500,
        color: '#0B478E',
    },
    place: {
        fontSize: 21,
    },
    button: {
        height: '100%',
        borderRadius: '0 10px 10px 0',
    },
    overlay: {
        position: 'absolute',
        top: 85,
        width: '100%',
        height: 79,
        cursor: 'pointer',
    },

    '@media (max-width: 960px)': {
        event: {
            fontSize: 20,
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
        button: {
            display: 'none',
        },
        overlay: {
            display: 'flex',
        },
    },
});

const HomePageWidget = ({ date, place, eventType, url }) => {
    const styles = useStyles();
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const eventDate = new Date(date);
    const day = eventDate.getDate();
    const monthIndex = eventDate.getMonth();
    const month = months[monthIndex];

    return (
        <>
            <Box display="flex" className={styles.root}>
                <Box display="flex" flexGrow={1} className={styles.CardContent}>
                    <Box alignItems="center" display="flex" flexGrow={1} className={styles.description}>
                        <Box className={styles.date}>
                            <Typography className={styles.day} align="center" color="textSecondary">
                                {day}
                            </Typography>
                            <Typography className={styles.month} align="center" color="textSecondary">
                                {month}
                            </Typography>
                        </Box>
                        <Box className={styles.eventDesc} flexGrow={1}>
                            <Typography className={styles.place} color="textSecondary">
                                {place}
                            </Typography>
                            <Typography className={styles.event}>{eventType}</Typography>
                        </Box>
                    </Box>
                    <Link href="google.com" target="blank">
                        <Button className={styles.button} variant="contained" color="primary">
                            <ArrowForwardIosIcon />
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Link href={url} target="blank">
                {/* eslint-disable-next-line react/self-closing-comp */}
                <div className={styles.overlay}></div>
            </Link>
        </>
    );
};
HomePageWidget.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    place: PropTypes.string.isRequired,
    eventType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};
export default HomePageWidget;
