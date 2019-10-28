// Action Types
export const Types = {
    ADD: 'transacoes/ADD'
}


// Reducers
export const INITIAL_STATE = {
    transacoes: JSON.parse(localStorage.getItem('transacoes')) || []
}

export function transacoesReducer(state, action) {
    switch (action.type) {
        case Types.ADD:
            return { ...state, transacoes: [ ...state.transacoes, action.payload.novaTransacao] };
        default:
            return state;
    }
}


// Action Creators
export const Creators = {

    addNovaTransacao: (novaTransacao) => {

        return Creators.dispatch({
            type: Types.ADD,
            payload: { novaTransacao }
        });
    }
}