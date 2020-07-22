import React, { useState, useCallback, useMemo, ReactElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Img from 'gatsby-image/withIEPolyfill';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import chunk from 'lodash-es/chunk';

import Carousel, { Modal, ModalGateway } from 'react-images';

import { FluidImage } from '../../constants/prop-types';

const useStyles = makeStyles(() => ({
    photoGallery: {
        display: 'grid',
        width: '100%',
        height: '100%',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoRows: '16.66%',
        gridColumnGap: '17px',
    },
    photo: {
        borderRadius: '10px',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        cursor: 'pointer',
    },
    photoBox: {
        marginBottom: '17px',
        '&:last-child': {
            marginBottom: 0,
        },
    },
    photoBox_0: { gridColumnStart: '1', gridColumnEnd: '2', gridRowStart: '1', gridRowEnd: '4' },
    photoBox_1: { gridColumnStart: '2', gridColumnEnd: '3', gridRowStart: '1', gridRowEnd: '1' },
    photoBox_2: { gridColumnStart: '1', gridColumnEnd: '2', gridRowStart: '4', gridRowEnd: '5' },
    photoBox_3: { gridColumnStart: '2', gridColumnEnd: '3', gridRowStart: '2', gridRowEnd: '5' },
    photoBox_4: { gridColumnStart: '1', gridColumnEnd: '3', gridRowStart: '5', gridRowEnd: '7' },

    slider: {
        background: 'linear-gradient(270deg, #187BC0 0%, #0A458C 100%)',
        boxShadow: '10px 10px 20px #9E9A9A',
        borderRadius: '25px',
        fontSize: '16px',
        lineHeight: '19px',
        color: '#FFFFFF',
        textTransform: 'uppercase',
        position: 'absolute',
    },

    photosLabel: {
        margin: '0 27px',
    },
}));

const GRID_IMAGE_SIZE = 5;

const PhotoGallery = ({ photos }) => {
    const classes = useStyles();

    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const openLightbox = useCallback(index => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    }, []);

    const photoPages = useMemo(() => chunk(photos, GRID_IMAGE_SIZE), [photos]);

    return (
        <>
            <div className={classes.photoGallery}>
                {photoPages[currentPage].map((photoInfo, index) => {
                    const openPhoto = () : void => {
                        openLightbox(currentPage * GRID_IMAGE_SIZE + index);
                    };
                    return (
                        <div
                            key={index}
                            className={classNames(classes.photoBox, classes[`photoBox_${index}`])}
                            onClick={openPhoto}
                            onKeyPress={openPhoto}
                            tabIndex="0"
                            role="button"
                        >
                            <Img
                                className={classes.photo}
                                fluid={photoInfo.gridPhoto.childImageSharp.fluid}
                                objectFit="cover"
                                objectPosition="50% 50%"
                                alt={photoInfo.description}
                                loading="lazy"
                            />
                        </div>
                    );
                })}
            </div>

            {photos.length > GRID_IMAGE_SIZE && (
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Box display="flex" alignItems="center" className={classes.slider}>
                        <IconButton
                            aria-label="previous image"
                            color="inherit"
                            disabled={currentPage === 0}
                            onClick={() => {
                                setCurrentPage(currentPage - 1);
                            }}
                        >
                            <NavigateBeforeIcon />
                        </IconButton>
                        <span className={classes.photosLabel}>PHOTOS</span>
                        <IconButton
                            aria-label="next image"
                            color="inherit"
                            disabled={currentPage === photoPages.length - 1}
                            onClick={() => {
                                setCurrentPage(currentPage + 1);
                            }}
                        >
                            <NavigateNextIcon />
                        </IconButton>
                    </Box>
                </Box>
            )}

            <ModalGateway>
                {viewerIsOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={currentImage}
                            views={photos.map(({ fullScreenPhoto: { childImageSharp: { fluid } }, description }) => ({
                                ...fluid,
                                srcset: fluid.srcSet,
                                caption: description,
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </>
    );
};

PhotoGallery.propTypes = {
    photos: PropTypes.arrayOf(
        PropTypes.shape({
            description: PropTypes.string,
            gridPhoto: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                    fluid: FluidImage,
                }),
            }),
            fullScreenPhoto: PropTypes.shape({
                childImageSharp: PropTypes.shape({
                    fluid: FluidImage,
                }),
            }),
        }),
    ).isRequired,
};

export default PhotoGallery;
