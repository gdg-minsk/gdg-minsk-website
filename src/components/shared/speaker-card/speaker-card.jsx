import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';

import SocialBar from '../socail-bar/social-bar';

const useStyles = makeStyles({
    card: {
        maxWidth: 330,
    },
});

export default function SpeakerCard() {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        R
                    </Avatar>
                }
                title="Vadim Smirnov"
            />
            <CardActions disableSpacing>
                <SocialBar />
            </CardActions>
        </Card>
    );
}
