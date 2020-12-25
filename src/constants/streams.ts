import { ListItem } from '../entities/entities';

export const ALL = 'all';

const streams: ListItem[] = [
    {
        title: 'All',
        value: ALL,
    },
    {
        title: 'Web Meetup',
        value: 'WEB',
    },
    {
        title: 'Mobile Meetup',
        value: 'MOBILE',
    },
    {
        title: 'Cloud Meetup',
        value: 'CLOUD',
    },
];

export default streams;
