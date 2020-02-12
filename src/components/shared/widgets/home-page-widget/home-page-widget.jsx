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
    },
    button: {
        height: 100,
        marginLeft: 'auto',
    },
    date: {},
    description: {},
});

const HomePageWidget = () => {
    const styles = useStyles();

    return (
        <Card className={styles.root}>
            <CardContent>
                <Typography
                    className={styles.date}
                    gutterBottom
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    noWrap
                >
                    Lorem Ipsum
                </Typography>
                <Typography
                    className={styles.description}
                    gutterBottom
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    noWrap
                >
                    Dolor sit amet
                </Typography>
                <Button className={styles.button} variant="contained" color="primary">
                    <ArrowForwardIosIcon />
                </Button>
            </CardContent>
        </Card>
    );
};

export default HomePageWidget;
