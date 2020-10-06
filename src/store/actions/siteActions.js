import API from '../../utils/api';

export const getPosts = (skip) => {
    return dispatch => {
        API.getSitePosts( skip, res => {
            dispatch({
                type: 'GOT_SITE_POSTS',
                payload: res.data,
                skip: skip
            })
        })
    }
}

export const getPostCount = () => {
    return dispatch => {
        API.getPostCount( res => {
            dispatch({
                type: 'GOT_POST_COUNT',
                payload: res.data,             
            })
        })
    }
}


export const getPostBySlug = (slug) => {
    return dispatch => {
        API.getPostBySlug(slug, res => {
            dispatch({
                type: 'SET_FULL_POST_DATA',
                payload: res.data[0]
            })
            
        })
        
    }
}

export const postComment = (comment, token) => {
    return dispatch => {
        API.postComment(comment, token, res => {
            if (res.status === 200){
                API.getCommentById(res.data._id, res2 => {
                    //console.log(res.data);
                    dispatch({
                        type: 'ADDED_COMMENT',
                        payload: res2.data
                    })
                })             

            }
            
        })
    }
}

export const getComments = () => {
    return dispatch => {
        API.getComments(res => {
            dispatch({
                type: 'GOT_COMMENTS',
                payload: res.data
            })
            
        })
        
    }
}

