import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';

import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

const GoogleMap = ({ google, lat, lng, zoom }): ReactElement => {
    return (
        <Map
            style={{
                width: '100%',
                height: '100%',
            }}
            google={google}
            zoom={zoom}
            initialCenter={{
                lat,
                lng,
            }}
            streetViewControl
            mapTypeControl
        >
            <Marker name="Current location" />
        </Map>
    );
};

GoogleMap.defaultProps = {
    lat: 53.8900622,
    lng: 27.5694907,
    zoom: 17,
};

GoogleMap.propTypes = {
    google: PropTypes.shape({}).isRequired,
    lat: PropTypes.number,
    lng: PropTypes.number,
    zoom: PropTypes.number,
};

export default GoogleApiWrapper({
    apiKey: process.env.GATSBY_GOOGLE_API_TOKEN,
})(GoogleMap);
