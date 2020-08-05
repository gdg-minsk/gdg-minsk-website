import { FluidImage } from '../constants/prop-types';

export interface SocialNetwork {
    type: string;
    url: string;
}

export interface Filter {
    eventType: string;
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
