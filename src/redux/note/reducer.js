const DEFAULT_STATE = {
    data: null,
    loading: false,
    error: null,
}

export const noteReducer = (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case 'NOTE/LOADING':
            return {
                loading: true,
                error: null,
                data: null
            }
        case 'NOTE/SET':
            return {
                loading: false,
                error: null,
                data: action.payload,
            }
        case 'NOTE/ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            }
        default: 
            return state
    }
}