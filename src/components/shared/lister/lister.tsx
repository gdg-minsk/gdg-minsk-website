import React, { ReactElement } from 'react';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import './lister.css';

export interface ListerProps {
    label: string;
    currentIndex: number;
    listLength: number;
    onNextClick: (indexToSelect: number) => void;
    onPrevClick: (indexToSelect: number) => void;
    className?: string;
}

const Lister = ({ label, onNextClick, onPrevClick, currentIndex, listLength, className }: ListerProps): ReactElement => {
    return (
        <Box display="flex" alignItems="center" justifyContent="center" className={className}>
            <Box display="flex" alignItems="center" className="slider">
                <IconButton
                    aria-label="previous"
                    color="inherit"
                    disabled={currentIndex === 0}
                    onClick={() => onPrevClick(currentIndex - 1)}
                >
                    <NavigateBeforeIcon />
                </IconButton>
                <span className="listerLabel">{label}</span>
                <IconButton
                    aria-label="next"
                    color="inherit"
                    disabled={currentIndex === listLength - 1}
                    onClick={() => onNextClick(currentIndex + 1)}
                >
                    <NavigateNextIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Lister;
