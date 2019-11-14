import React from 'react';
import PropTypes from 'prop-types';

import '@fortawesome/fontawesome-free/css/all.css';

function SocialIcon({ url, socialNetwork }) {
    return (
        <>
            {(() => {
                switch (socialNetwork) {
                    case 'twitter':
                        return (
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter" />
                            </a>
                        );
                    case 'github':
                        return (
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github" />
                            </a>
                        );
                    case 'medium':
                        return (
                            <a href={url} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-medium-m" />
                            </a>
                        );
                    default:
                        return null;
                }
            })()}
        </>
    );
}

SocialIcon.propTypes = {
    url: PropTypes.string.isRequired,
    socialNetwork: PropTypes.string.isRequired,
};

export default SocialIcon;
