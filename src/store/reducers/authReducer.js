
const defaultState = {
    user: {},
    error: null,
    profile: {}
}

const auth = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload,
            }
        case 'AFTER_LOGIN': 
            return {
                ...state,
                 ...action.payload                             
            }
        case 'SHOW_ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'PASSWORD_CHANGED':
            return {
                ...state,
                user:{
                    ...state.user,
                    ...action.payload,
                }               
            }
        default:
            return state
    }
}

export default auth;