import React, { ReactElement } from 'react';
import './not-found.styles.css';

const NotFound = (): ReactElement => {
    return (
        <div className="ml60 mt240 align-l w-full">
            <div className="not-found-header">OOPS</div>
            <div className="mt120 not-found-text">We did not find anything for your request</div>
        </div>
    );
};

export default NotFound;
