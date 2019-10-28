// Reducers and Initial state
import { transacoesReducer, INITIAL_STATE as TransacoesInitialState } from './ducks/transacoes';

export function combinedReducers(state, action) {

    return combine(state, action, [
        transacoesReducer
    ]);
}

function combine(state, action, reducers) {

    let newState = state;    

    for (let index = 0; index < reducers.length; index++) {
        
        let newState = reducers[index](state, action);

        if(!Object.is(state, newState)) return newState; 
        
        console.log(index);
    }

    console.log(newState);
    
    return newState;
}


export const COMBINED_INITIAL_STATE = { 
    ...TransacoesInitialState
};