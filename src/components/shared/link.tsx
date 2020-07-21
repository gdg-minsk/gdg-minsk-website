import React, { ReactNode, RefObject } from 'react';
import PropTypes from 'prop-types';

import { Link as GatsbyLink } from 'gatsby';

import MuiLink from '@material-ui/core/Link';

interface Props {
    children?: ReactNode;
    to: string;
    className: string;
    target: string;
}

const Link = React.forwardRef(function Link(props: Props, ref: any) {
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

export default Link;