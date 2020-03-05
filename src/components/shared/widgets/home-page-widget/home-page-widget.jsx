import React from 'react';
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
        }
    },
    '@media (max-width: 600px)': {
        // root:{
        //     '&:hover':{
        //         opacity: '1'
        //     } 
        //   }
    //     button: {
    //         display: 'none',
    //     },
    //     event: {
    //         fontSize: 20,
    //     },
    //     place: {
    //         fontSize: 14,
    //     },
    //     day: {
    //         fontSize: 30,
    //     },
    //     month: {
    //         fontSize: 14,
    //     },
    //     eventDesc: {
    //         paddingTop: '2%',
    //         paddingLeft: 12,
    //     },
    //     date: {
    //         paddingLeft: 10,
    //     },
    },
    // '@media (min-width: 600px)': {
    //     overlay: {
    //         display: 'none',
    //     },
    // },
});

const HomePageWidget = () => {
    const styles = useStyles();

    return (
        <>
            <Box display='flex' className={styles.root}>
                <Box display='flex' flexGrow={1} className={styles.CardContent}>
                    <Box alignItems="center" display='flex' flexGrow={1} className={styles.description}>
                        <Box className={styles.date}>
                            <Typography className={styles.day} align='center' color="textSecondary">28</Typography>
                            <Typography className={styles.month} align='center' color="textSecondary">January</Typography>
                        </Box>
                        <Box className={styles.eventDesc} flexGrow={1}>
                            <Typography className={styles.place} color="textSecondary">
                                ул. Октябрьская 16/4 (SPACE)
                            </Typography>
                            <Typography className={styles.event}>GDG Minsk Cloud Meetup</Typography>
                        </Box>
                    </Box>
                    <Link href="google.com" target="blank">
                        <Button className={styles.button} variant="contained" color="primary">
                            <ArrowForwardIosIcon />
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Link href="google.com" target="blank">
                {/* eslint-disable-next-line react/self-closing-comp */}
                <div className={styles.overlay}></div>
            </Link>
        </>
    );
};

export default HomePageWidget;
