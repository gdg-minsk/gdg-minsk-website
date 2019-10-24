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
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
    cardImg: {
        height: 189,
    },
    avatar: {
        marginRight: 10,
        width: 25,
        height: 25,
    },
    button: {
        marginLeft: 'auto',
    },
});

const EventCard = ({ imageUrl, imageTitle, title, description, date, speakers }) => {
    const classes = useStyles();
    const listItems = speakers.map(speaker => (
        <Link key={speaker.id} to="/speaker">
            <Tooltip title={speaker.name}>
                <Avatar alt="Ilya" src={speaker.avatar} className={classes.avatar} />
            </Tooltip>
        </Link>
    ));

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    className={classes.cardImg}
                    component="img"
                    alt="Event image"
                    image={imageUrl}
                    title={imageTitle}
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h6" component="h3" noWrap>
                    {title}
                </Typography>
                <Typography gutterBottom variant="body1" color="textSecondary" component="p">
                    {date}
                </Typography>
                <Typography gutterBottom variant="body2" color="textSecondary" component="p" noWrap>
                    {description}
                </Typography>

                <CardActions>
                    {speakers ? listItems : <Typography>There are no speakers yet...</Typography>}
                    <Button className={classes.button} size="small" color="primary">
                        Register
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
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
            name: PropTypes.string,
            avatar: PropTypes.string,
        }),
    ),
    date: PropTypes.string,
};

EventCard.defaultProps = {
    imageUrl: '/img/gdg-cover.png',
    speakers: [],
    imageTitle: 'GDG Event',
    date: '',
};

export default EventCard;
