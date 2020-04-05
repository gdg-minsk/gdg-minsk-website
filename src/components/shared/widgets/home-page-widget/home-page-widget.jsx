import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import getEventMonth from '../../../../tools/months';
import { useWindowDimensions } from '../../../../hooks/window-size';
import { TabletWidth } from '../../../../constants/window-sizes';

const useStyles = makeStyles({
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
        buttonContainer: {
            display: 'none',
        },
    },
});

const HomePageWidget = ({ date, place, eventType, url }) => {
    const styles = useStyles();

    const { width } = useWindowDimensions();

    const widget = (
        <Box display="flex" flexGrow={1} borderRadius="10px" boxShadow="5px 5px 20px #D1D1D1">
            <Box alignItems="center" display="flex" flexGrow={1} padding="15px 0 15px 15px">
                <Box className={styles.date}>
                    <Typography className={styles.day} align="center" color="textSecondary">
                        {date.getDate()}
                    </Typography>
                    <Typography className={styles.month} align="center" color="textSecondary">
                        {getEventMonth(date)}
                    </Typography>
                </Box>
                <Box flexGrow={1} margin="0 30px">
                    <Typography className={styles.place} color="textSecondary">
                        {place}
                    </Typography>
                    <Typography className={styles.event}>{eventType}</Typography>
                </Box>
            </Box>
            <Link href={url} target="blank" className={styles.buttonContainer}>
                <Button className={styles.button} variant="contained" color="primary">
                    <ArrowForwardIosIcon />
                </Button>
            </Link>
        </Box>
    );

    if (width <= TabletWidth) {
        return (
            <Link href={url} target="blank" underline="none">
                {widget}
            </Link>
        );
    }

    return widget;
};

HomePageWidget.propTypes = {
    date: PropTypes.instanceOf(Date).isRequired,
    place: PropTypes.string.isRequired,
    eventType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
};

export default HomePageWidget;
