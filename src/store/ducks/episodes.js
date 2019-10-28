// Action Types
export const Types = {
    REQUEST: 'episodes/GET_REQUEST'
}


// Reducers
export const INITIAL_STATE = {
    episodes: []
}

export function episodesReducer(state, action) {
    switch (action.type) {
        case Types.REQUEST:
            return { ...state, episodes: action.payload.episodes };
        default:
            return state;
    }
}


// Action Creators
export const Creators = {

    fetchDataAction: async () => {
        const response = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes').then(data => data.json());
    
        return Creators.dispatch({
            type: Types.REQUEST,
            payload: { episodes: response._embedded.episodes}
        });
    }
}