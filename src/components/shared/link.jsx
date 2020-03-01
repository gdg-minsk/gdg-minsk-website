import React from 'react';
import PropTypes from 'prop-types';

import { Link as GatsbyLink } from 'gatsby';

import MuiLink from '@material-ui/core/Link';

const Link = React.forwardRef(function Link(props, ref) {
    const internal = /^\/(?!\/)/.test(props.to);

    if (internal) {
        return <MuiLink component={GatsbyLink} ref={ref} {...props} />;
    }
    return (
        <MuiLink href={props.to} ref={ref} {...props}>
            {props.children}
        </MuiLink>
    );
});

Link.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default Link;
