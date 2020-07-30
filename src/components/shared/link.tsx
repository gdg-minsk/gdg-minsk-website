import React, { ReactNode } from 'react';

import { Link as GatsbyLink } from 'gatsby';

import MuiLink from '@material-ui/core/Link';

interface Props {
    children?: ReactNode;
    to: string;
    className?: string;
    activeClassName?: string;
    target?: string;
    variant?:
        | 'button'
        | 'caption'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'inherit'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'overline'
        | 'srOnly';
    color?: 'inherit' | 'primary' | 'secondary' | 'initial' | 'textPrimary' | 'textSecondary' | 'error';
    underline?: 'none' | 'always' | 'hover';
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
