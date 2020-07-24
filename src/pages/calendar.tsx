import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import Layout from '../components/shared/layout/layout';
import SEO from '../components/shared/seo';
import Image from '../components/shared/image';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CalendarPage = (): ReactElement => (
    <Layout
        parallaxContent={
            <h1 style={{ color: 'red' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent tincidunt feugiat massa, ut ornare
                tortor suscipit quis. Mauris mollis mauris quis lacus pellentesque, non hendrerit odio consectetur.
                Vestibulum nec nisi sed urna egestas rhoncus et nec tellus. Praesent sit amet cursus metus. Sed tortor
                nulla, vehicula eget consequat nec, consectetur et ligula. Sed pretium ex felis, in dapibus nunc
            </h1>
        }
        bannerImages={[
            {
                image: '/img/gdg-stickers.jpg',
                amount: 0.4,
            },
        ]}
    >
        <SEO title="Calendar" />

        <Typography gutterBottom variant="h1" component="h1">
            Calendar
        </Typography>

        <Box style={{ maxWidth: `800px`, width: '100%', marginBottom: `1.45rem`, margin: '0 auto', padding: 20 }}>
            <Calendar
                localizer={localizer}
                events={[]}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </Box>
    </Layout>
);

export default CalendarPage;
