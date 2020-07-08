const defaultState = {
    users: [],
    user: {},
    posts: [],
    post: {}
}

const admin = (state = defaultState, action) => {
    switch(action.type){
        case 'GOT_USERS': 
            return {
                ...state,
                users: action.payload
            }
        case 'USER_ADDED':
            return {
                ...state,
                user: action.payload
            }
        case 'UPDATED_USER':
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload,
                }
            }
        case 'UPDATED_USER_ROLE':
            return {
                ...state,
                user: {
                    ...state.user,
                    Profile: action.payload
                }
            }
        case 'DELETED_USER': 
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }
        case 'DELETED_USER_ROLE': 
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.payload
                }
            }   
        case 'GOT_SINGLE_USER':
            return {
                ...state,
                user: action.payload,              
            }
        case 'GOT_POSTS':
            return {
                ...state,
                posts: action.payload
            }
       
        case 'POST_ADDED':
            return {
                ...state,
                posts: state.posts.concat(action.payload),
                post: action.payload
            }
        case 'UPDATED_POST':
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.payload,
                },
                posts: state.posts.map(p => {
                    if (p.id === action.payload.id){
                        //This is the existing post in redux that has been
                        // updated and currently in action.payload
                        return {
                            ...p,
                            ...action.payload
                        } 
                    } else {
                        return p
                    }
                })
            }
        case 'GOT_SINGLE_POST':
            return {
                ...state,
                post: action.payload,              
            }           
            case 'DELETED_POST': 
            return {
                ...state,
                post: {
                    ...state.post,
                    ...action.payload
                }
            }
        case 'DELETED_POST_IMAGE': 
            return {
                ...state,
                post: {
                    ...state.post,
                    PostImage: [action.payload]
                }
            }  
        case 'UPLOADED_IMAGE':
            return {
                ...state,
                post: {
                    ...state.post,
                    PostImage: [action.payload]
                }
            }
        
        default: 
        return state
    }
}

export default admin;