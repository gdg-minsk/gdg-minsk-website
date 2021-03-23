import React, { ReactElement } from 'react';
import Box from '@material-ui/core/Box';
import Stork from '../../../static/svg/stork.svg';
import UserIcon from '../../../static/svg/user.svg';
import { Pic } from '../../entities/entities';

export interface PhotoProps {
    photoUrl?: Pic;
    className?: string;
    alt?: string;
}

const Photo = ({ photoUrl, alt, className = 'speakerPhoto' }: PhotoProps): ReactElement => {
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
