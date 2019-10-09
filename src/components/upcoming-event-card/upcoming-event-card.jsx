import React from 'react';

import { Link } from 'gatsby';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
    card: {
        width: 330,
    },
    cardImg: {
        height: 189,
    },
    avatar: {
        marginRight: 10,
        width: 25,
        height: 25,
    },
});

export default function ImgMediaCard() {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.cardImg}
                    component="img"
                    alt="Contemplative Reptile"
                    height="140"
                    image="/img/gdg.png"
                    title="Contemplative Reptile"
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                    A very long name for a next GDG meetup
                </Typography>
                <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                    10 June
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    Detailed description of the event
                </Typography>

                <CardActions>
                    <Link to="/speaker">
                        <Avatar alt="Ilya" src="/img/ilya.jpg" className={classes.avatar} />
                    </Link>
                    <Link to="/speaker">
                        <Avatar alt="Ilya" src="/img/ilya.jpg" className={classes.avatar} />
                    </Link>
                    <Link to="/speaker">
                        <Avatar alt="Ilya" src="/img/ilya.jpg" className={classes.avatar} />
                    </Link>
                    <Link to="/speaker">
                        <Avatar alt="Ilya" src="/img/ilya.jpg" className={classes.avatar} />
                    </Link>
                    <Button size="small" color="primary">
                        Register
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}
