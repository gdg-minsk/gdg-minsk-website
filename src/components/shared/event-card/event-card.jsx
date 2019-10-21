import React from 'react';
import PropTypes from 'prop-types';

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

const EventCard = ({ imageUrl, eventTitle, eventDescription, eventDate, speakers }) => {
    const classes = useStyles();
    const speakersArray = speakers;
    const listItems = speakersArray.map(speaker => (
        <Link to="/speaker">
            <Avatar alt="Ilya" src={speaker.speakerImg} className={classes.avatar} />
        </Link>
    ));

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.cardImg}
                    component="img"
                    alt="Event image"
                    height="140"
                    image={imageUrl}
                    title="Event image"
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h3">
                    {eventTitle}
                </Typography>
                <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                    {eventDate}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                    {eventDescription}
                </Typography>

                <CardActions>
                    {listItems}
                    <Button size="small" color="primary">
                        Register
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
};

EventCard.propTypes = {
    imageUrl: PropTypes.string,
    eventTitle: PropTypes.string.isRequired,
    eventDescription: PropTypes.string.isRequired,
    speakers: PropTypes.arrayOf(PropTypes.string),
    eventDate: PropTypes.string,
};

EventCard.defaultProps = {
    imageUrl: '',
    speakers: [],
    eventDate: '',
};

export default EventCard;
