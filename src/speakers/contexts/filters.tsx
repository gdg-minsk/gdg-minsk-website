import React, { useReducer, createContext, useContext, ReactElement } from 'react';
import PropTypes from 'prop-types';

import { ALL_STREAMS } from '../../constants/app';

const SpeakersFilterStateContext = createContext();
const SpeakersFilterDispatchContext = createContext();

const INIT_STATE = {
    eventType: ALL_STREAMS,
    searchStr: '',
};

const speakersFilterReducer = (state, action): any => {
    switch (action.type) {
        case 'setEventType': {
            return { ...state, eventType: action.payload.eventType };
        }
        case 'setSearchStr': {
            return { ...state, searchStr: action.payload.searchStr };
        }
        case 'setFilters': {
            return { ...state, searchStr: action.payload.searchStr, eventType: action.payload.eventType };
        }
        case 'reset': {
            return { ...INIT_STATE };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
};

const SpeakersFilterProvider = ({ children }): ReactElement => {
    const [state, dispatch] = useReducer(speakersFilterReducer, INIT_STATE);

    return (
        <SpeakersFilterStateContext.Provider value={state}>
            <SpeakersFilterDispatchContext.Provider value={dispatch}>{children}</SpeakersFilterDispatchContext.Provider>
        </SpeakersFilterStateContext.Provider>
    );
};

SpeakersFilterProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

const useSpeakersFilterState = (): any => {
    const context = useContext(SpeakersFilterStateContext);

    if (context === undefined) {
        throw new Error('useSpeakersFilterState must be used within a SpeakersFilterProvider');
    }

    return context;
};

const useSpeakersFiltersDispatch = (): any => {
    const context = useContext(SpeakersFilterDispatchContext);

    if (context === undefined) {
        throw new Error('useSpeakersFiltersDispatch must be used within a SpeakersFilterProvider');
    }
    return context;
};

export { SpeakersFilterProvider, useSpeakersFilterState, useSpeakersFiltersDispatch };
