import React, { createContext, useReducer, useContext } from 'react'

import { combinedReducers, COMBINED_INITIAL_STATE } from './combiner';

export function StoreProvider(props) {

    const [state, dispatch] = useReducer(combinedReducers, COMBINED_INITIAL_STATE);

    const value = { state, dispatch };

    return (<Store.Provider value={value}>
        {props.children}
    </Store.Provider>);
}

export const Store = createContext();

export const useStore = () => useContext(Store);
