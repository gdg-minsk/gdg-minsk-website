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
    fullName: string;
    company?: string;
    jobTitle?: string;
    socialNetworks?: SocialNetwork[];
    speackerPic?: string;
    streams: string[];
    description: string;
}

export interface Talk {
    id: string;
    speaker: Speaker;
    topic: string;
    description: string;
    photo: typeof FluidImage;
}

export interface CommunityEvent {
    id: string;
    name: string;
    description: string;
    place?: string;
    date?: Date;
    talks: Talk[];
    photo: typeof FluidImage;
    stream: string;
}

export interface Contact {
    id: string;
    fullName: string;
    userPic: UserPic;
    email: string;
    telegram: string;
    phoneNumber: string;
}

export interface UserPic {
    title: string;
    url: string;
}

export interface GaleryPhoto {
    file: File;
}

export interface File {
    url: string;
    fileName: string;
}
