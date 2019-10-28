// Reducers and Initial state
import { episodesReducer, INITIAL_STATE as EpisodesInitialState } from './ducks/episodes';
import { favoritesReducer, INITIAL_STATE as FavouritesInitialState } from './ducks/favourites';

export function combinedReducers(state, action) {

    return combine(state, action, [
        episodesReducer,
        favoritesReducer
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
    ...EpisodesInitialState,
    ...FavouritesInitialState
};