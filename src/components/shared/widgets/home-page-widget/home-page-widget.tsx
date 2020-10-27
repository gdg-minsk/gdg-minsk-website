import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import getEventMonth from '../../../../tools/months';
import { useWindowDimensions } from '../../../../hooks/window-size';
import { TabletWidth } from '../../../../constants/window-sizes';
import { CommunityEvent } from '../../../../entities/entities';
import Link from '../../link';

const useStyles = makeStyles({
    date: {
        marginLeft: 10,
    },
    day: {
        fontSize: 50,
        lineHeight: '50px',
    },
    month: {
        fontSize: 24,
    },
    event: {
        fontSize: 28,
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

const HomePageWidget = ({ communityEvent }: { communityEvent: CommunityEvent }): ReactElement => {
    const styles = useStyles();

    const eventDate = new Date(communityEvent.date);

    const { width } = useWindowDimensions();

    const widget = (
        <Link to={'/event/' + communityEvent.id} underline="none">
            <Box display="flex" flexGrow={1} borderRadius="10px" boxShadow="5px 5px 20px #D1D1D1">
                <Box alignItems="center" display="flex" flexGrow={1} padding="15px 0 15px 15px">
                    <Box className={styles.date}>
                        <Typography className={styles.day} align="center" color="textSecondary">
                            {eventDate.getDate()}
                        </Typography>
                        <Typography className={styles.month} align="center" color="textSecondary">
                            {getEventMonth(eventDate)}
                        </Typography>
                    </Box>
                    <Box flexGrow={1} margin="0 30px">
                        <Typography className={styles.place} color="textSecondary">
                            {communityEvent.place}
                        </Typography>
                        <Typography className={styles.event}>{communityEvent.name}</Typography>
                    </Box>
                </Box>
                {/* <Link href={url} target="blank" className={styles.buttonContainer}>
                    <Button className={styles.button} variant="contained" color="primary">
                        <ArrowForwardIosIcon />
                    </Button>
                </Link> */}
            </Box>
        </Link>
    );

    // if (width <= TabletWidth) {
    //     return (
    //         <Link href={url} target="blank" underline="none">
    //             {widget}
    //         </Link>
    //     );
    // }

    return widget;
};

export default HomePageWidget;