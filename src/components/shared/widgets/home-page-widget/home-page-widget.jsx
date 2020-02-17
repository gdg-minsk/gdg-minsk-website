import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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
    '@media (max-width: 1010)': {
        eventType: {
            fontSize: 22,
        },
    },
    '@media (max-width: 960px)': {
        day: {
            fontSize: 45,
        },
    },
    '@media (max-width: 600px)': {
        day: {
            fontSize: 28,
        },
    },
});

const HomePageWidget = () => {
    const styles = useStyles();

    return (
        <Card className={styles.root}>
            <CardContent className={styles.CardContent}>
                <Typography className={styles.date} gutterBottom variant="body2" color="textSecondary" component="div">
                    <Typography className={styles.day}>28</Typography>
                    <Typography className={styles.month}>January</Typography>
                </Typography>
                <Typography className={styles.description} gutterBottom variant="body2" component="div">
                    <Typography className={styles.adress} color="textSecondary">
                        ул. Октябрьская 16/4 (SPACE)
                    </Typography>
                    <Typography className={styles.eventType}>GDG Minsk Cloud Meetup</Typography>
                </Typography>
                <Button className={styles.button} variant="contained" color="primary">
                    <ArrowForwardIosIcon />
                </Button>
            </CardContent>
        </Card>
    );
};

export default HomePageWidget;
