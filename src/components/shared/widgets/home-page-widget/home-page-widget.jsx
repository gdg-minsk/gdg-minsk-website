import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles({
    root: {
        color: 'white',
        height: 136,
        width: '100%',
    },
    CardContent: {
        display: 'flex',
        flexDirection: 'row',
        height: '100%',
        padding: 0,
        paddingBottom: '0 !important',
    },
    button: {
        marginLeft: 'auto',
        height: '100%',
    },
    date: {
        flexGrow: 1,
        paddingLeft: 14,
        paddingRight: 30,
        textAlign: 'center',
    },
    day: {
        fontSize: 65,
        height: 80,
        marginTop: 5,
    },
    month: {
        fontSize: 18,
    },
    description: {
        flexGrow: 2,
    },
    adress: {
        fontSize: 18,
        paddingTop: 30,
        marginBottom: 10,
    },
    eventType: {
        color: '#0B478E',
        fontSize: 28,
    },
    overlay: {
        position: 'absolute',
        top: 85,
        width: '100%',
        height: 79,
        cursor: 'pointer',
    },
    '@media (max-width: 1280px)': {},
    '@media (max-width: 960px)': {},
    '@media (max-width: 600px)': {},
    '@media (min-width: 600px)': {
        overlay: {
            display: 'none',
        },
    },
});

const HomePageWidget = () => {
    const styles = useStyles();

    return (
        <>
            <Card className={styles.root}>
                <CardContent className={styles.CardContent}>
                    <Typography
                        className={styles.date}
                        gutterBottom
                        variant="body2"
                        color="textSecondary"
                        component="div"
                    >
                        <Typography className={styles.day}>28</Typography>
                        <Typography className={styles.month}>January</Typography>
                    </Typography>
                    <Typography className={styles.description} gutterBottom variant="body2" component="div">
                        <Typography className={styles.adress} color="textSecondary">
                            ул. Октябрьская 16/4 (SPACE)
                        </Typography>
                        <Typography className={styles.eventType}>GDG Minsk Cloud Meetup</Typography>
                    </Typography>
                    <Link href="google.com" target="blank">
                        <Button className={styles.button} variant="contained" color="primary">
                            <ArrowForwardIosIcon />
                        </Button>
                    </Link>
                </CardContent>
            </Card>
            <Link href="google.com" target="blank">
                {/* eslint-disable-next-line react/self-closing-comp */}
                <div className={styles.overlay}></div>
            </Link>
        </>
    );
};

export default HomePageWidget;
