import React, { useReducer, createContext, useContext, ReactElement, Dispatch } from 'react';

import { ALL_STREAMS } from '../../constants/app';

interface Filter {
    eventType: string;
    searchStr: string;
}

interface Action {
    type: string;
    payload: Filter;
}

const INIT_STATE: Filter = {
    eventType: ALL_STREAMS,
    searchStr: '',
};

const SpeakersFilterStateContext = createContext<Filter>(INIT_STATE);
const SpeakersFilterDispatchContext = createContext<Dispatch<Action>>(undefined);

const speakersFilterReducer = (state: Filter, action: Action): Filter => {
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

interface Props {
    children?: ReactElement;
}

const SpeakersFilterProvider = ({ children }: Props): ReactElement => {
    const [state, dispatch] = useReducer(speakersFilterReducer, INIT_STATE);

    return (
        <SpeakersFilterStateContext.Provider value={state}>
            <SpeakersFilterDispatchContext.Provider value={dispatch}>{children}</SpeakersFilterDispatchContext.Provider>
        </SpeakersFilterStateContext.Provider>
    );
};

const useSpeakersFilterState = (): Filter => {
    const context = useContext(SpeakersFilterStateContext);

    if (context === undefined) {
        throw new Error('useSpeakersFilterState must be used within a SpeakersFilterProvider');
    }

    return context;
};

const useSpeakersFiltersDispatch = (): Dispatch<Action> => {
    const context = useContext(SpeakersFilterDispatchContext);

    if (context === undefined) {
        throw new Error('useSpeakersFiltersDispatch must be used within a SpeakersFilterProvider');
    }
    return context;
};

export { SpeakersFilterProvider, useSpeakersFilterState, useSpeakersFiltersDispatch };
