import { FluidImage } from '../constants/prop-types';

export interface ListItem {
    title: string;
    value: string;
}

export interface FilterItem {
    current: ListItem;
    options: ListItem[];
}

export interface SocialNetwork {
    type: string;
    url: string;
}

export interface SpeakerFilter {
    stream: FilterItem;
    searchStr: string;
}

export interface EventFilter {
    speaker: FilterItem;
    stream: FilterItem;
    searchStr: string;
}

export interface Speaker {
    id: string;
    name: string;
    company?: string;
    jobTitle?: string;
    socialNetworks?: SocialNetwork[];
    photo: typeof FluidImage;
    streams: string[];
}
