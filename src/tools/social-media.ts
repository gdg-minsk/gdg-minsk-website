import SocialMedia from '../constants/social-media';

import FacebookIcon from '../../static/svg/facebook.svg';
import InstagramIcon from '../../static/svg/instagram.svg';
import TelegramIcon from '../../static/svg/telegram.svg';
import TwitterIcon from '../../static/svg/twitter.svg';
import VkIcon from '../../static/svg/vk.svg';
import YoutubeIcon from '../../static/svg/youtube.svg';
import MeetupIcon from '../../static/svg/meetup.svg';
import DefaultIcon from '../../static/svg/default-social.svg';

const Icons = {
    [SocialMedia.FACEBOOK]: FacebookIcon,
    [SocialMedia.INSTAGRAM]: InstagramIcon,
    [SocialMedia.TELEGRAM]: TelegramIcon,
    [SocialMedia.TWITTER]: TwitterIcon,
    [SocialMedia.VK]: VkIcon,
    [SocialMedia.YOUTUBE]: YoutubeIcon,
    [SocialMedia.MEETUP]: MeetupIcon,
    [SocialMedia.OTHER]: DefaultIcon,
};

const getSocialMediaIcon = (type): any => {
    if (Icons[type]) {
        return Icons[type];
    }

    return DefaultIcon;
};

export default getSocialMediaIcon;
