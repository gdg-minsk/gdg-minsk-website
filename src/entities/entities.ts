import { FluidImage } from "../constants/prop-types";

interface SocialNetwork {
    type: string;
    url: string;
}

interface Filter {
    eventType: string;
    searchStr: string;
}

interface Speaker {
    id: string;
    name: string;
    company?: string;
    jobTitle?: string;
    socialNetworks?: SocialNetwork[];
    photo: typeof FluidImage;
    streams: string[];
}

export type {SocialNetwork, Filter, Speaker}