import React from 'react';

import SocialIcon from '../social-icon/social-icon';

import SOCIAL_DATA from '../../../mock-data/socail.mock';

function SocialBar() {
    const socialIcons = SOCIAL_DATA.map(socialIcon => (
        <SocialIcon key={socialIcon.id} url={socialIcon.url} socialNetwork={socialIcon.type} />
    ));

    return <>{socialIcons}</>;
}

export default SocialBar;
