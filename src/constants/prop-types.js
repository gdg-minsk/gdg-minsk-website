import PropTypes from 'prop-types';

export const FluidImage = PropTypes.shape({
    base64: PropTypes.string,
    src: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    aspectRatio: PropTypes.number,
    srcSet: PropTypes.string,
});
