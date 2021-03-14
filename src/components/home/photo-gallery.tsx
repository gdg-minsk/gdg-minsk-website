import React, { useState, useCallback, useMemo, ReactElement } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import chunk from 'lodash-es/chunk';

import Carousel, { Modal, ModalGateway } from 'react-images';

import { FluidImage } from '../../constants/prop-types';
import Lister from '../shared/lister/lister';
import { GaleryPhoto } from '../../entities/entities';

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
        objectPosition: '50% 50%',
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
}));

const GRID_IMAGE_SIZE = 5;

const PhotoGallery = ({ photos }): ReactElement => {
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
                {photoPages[currentPage].map((photoInfo: GaleryPhoto, index) => {
                    const openPhoto = (): void => {
                        openLightbox(currentPage * GRID_IMAGE_SIZE + index);
                    };
                    return (
                        <div
                            key={index}
                            className={classNames(classes.photoBox, classes[`photoBox_${index}`])}
                            onClick={openPhoto}
                            onKeyPress={openPhoto}
                            tabIndex={0}
                            role="button"
                        >
                            <img
                                className={classes.photo}
                                src={photoInfo.file.url}
                                loading="lazy"
                                alt={photoInfo.file.fileName}
                            />
                        </div>
                    );
                })}
            </div>

            {photos.length > GRID_IMAGE_SIZE && (
                <Lister
                    label="PHOTOS"
                    currentIndex={currentPage}
                    listLength={photoPages.length}
                    onNextClick={setCurrentPage}
                    onPrevClick={setCurrentPage}
                />
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
