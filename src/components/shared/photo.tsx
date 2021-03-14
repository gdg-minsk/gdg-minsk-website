import React, { ReactElement } from 'react';
import Box from '@material-ui/core/Box';
import './lister.css';
import Stork from '../../../static/svg/stork.svg';
import UserIcon from '../../../static/svg/user.svg';

export interface PhotoProps {
    photoUrl?: string;
    className?: string;
    alt?: string;
}

const Photo = ({ photoUrl, className = 'speakerPhoto', alt }: PhotoProps): ReactElement => {
    return !!photoUrl ? (
        <img className={className} src={photoUrl} alt={alt} />
    ) : (
        <Box className="defaultSpeakerPhotoContainer">
            <Box display="flex" flexDirection="column" position="absolute" width="100%" height="100%">
                <Box display="flex" justifyContent="flex-end">
                    <Stork height="40" />
                </Box>

                <Box display="flex" justifyContent="center" alignItems="center" flexGrow="1">
                    <UserIcon height="155" />
                </Box>
            </Box>
        </Box>
    );
};

export default Photo;
