import API from '../../utils/api';

export const getUsers = (token) => {
    return dispatch => {
        API.getUsers(token, res => {
            dispatch({
                type: 'GOT_USERS',
                payload: res.data
            })
        })
    }
    
}

export const addUsers = (user, token ) => {
    return dispatch => {
        API.addUsers(user, token, res => {
            dispatch({
                type: 'USER_ADDED',
                payload: res.data
            })
        })
    }
}

export const updateUser = (user, token) => {
    return dispatch => {
        API.updateUser(user, token, res => {
            dispatch({
                type: 'UPDATED_USER',
                payload: res.data
            })
        })
    }
}

export const updateUserRole = (role, id, token) => {
    return dispatch => {
        API.updateUserRole(role, id, token, res => {
            dispatch({
                type: 'UPDATED_USER_ROLE',
                payload: res.data
            })
        })
    }
}


export const getSingleUser = (id, token) => {
    return dispatch => {
        API.getSingleUser(id, token, res => {        
            dispatch({
                type: 'GOT_SINGLE_USER',
                payload: res.data
            })         
        })
    }
}

export const deleteUser = (user, token) => {
    return dispatch => {
        API.deleteUser(user, token, res => {
            dispatch({
                type: 'DELETED_USER',
                payload: res.data
            })
        })
    }
}

export const getPosts = (token) => {
    return dispatch => {
        API.getPosts(token, res => {
            dispatch({
                type: 'GOT_POSTS',
                payload: res.data
            })
        })
    }
    
}

export const addPosts = (posts, userId, token) => {
    return dispatch => {
        API.addPosts(posts, userId, token, res => {
            dispatch({
                type: 'POST_ADDED',
                payload: res.data
            })
        })
    }
}

export const getSinglePost = (id, token) => {
    return dispatch => {
        API.getSinglePost(id, token, res => {
            dispatch({
                type: 'GOT_SINGLE_POST',
                payload: res.data
            })
        })
    }
}

export const updatePost = (post, token) => {
    return dispatch => {
        API.updatePost(post, token, res => {
            dispatch({
                type: 'UPDATED_POST',
                payload: res.data
            })
        })
    }
}

export const deletePost = (post, token) => {
    return dispatch => {
        API.deletePost(post, token, res => {
            dispatch({
                type: 'DELETED_POST',
                payload: res.data
            })
        })
    }
}

export const deletePostImage = (postImage, pId, token) => {
    return dispatch => {
        API.deletePostImage(postImage, pId, token, res => {
            dispatch({
                type: 'DELETED_POST_IMAGE',
                payload: res.data
            })
        })
    }
}

export const uploadImage = (data, postId) => {
    return dispatch => {
        API.uploadImage(data, postId, res => {
            console.log(res.data);
            dispatch({
                type: 'UPLOADED_IMAGE',
                payload: res.data
            })
        })
    }
}

