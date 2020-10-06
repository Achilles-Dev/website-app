import axios from 'axios';


const host = 'http://localhost:8080';

const API = {
    makeFileURL: (url, token) => {
        return host + url + "?access_token=" + token;
    },
    login: (email, pass, success) => {
        axios.post(`${host}/api/users/login`, {email: email, password: pass})
        .then(res => {
            success(res);
        })
        .catch(() => {
            console.log("Can't access " + host);
        })
    },
    
    getUserProfile: (userId, success) => {
        axios.get(`${host}/api/users/${userId}/profile`)
        .then(res => {
            success(res);
        })
        .catch(err => {
            success(err.message);
        });
    },
    register: (name, email, pass, success) => {
        axios.post(`${host}/api/users`, {username: name, email: email, password: pass})
        .then(res => {
            success(res);
        })
        .catch(err => {
            success(err.message);
        })
    },
    addUsers: (user, token, success) => {
        axios.post(`${host}/api/users`, user, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
        .catch(err => {
            success(err.message);
        })
    },
    updateUser: (user, token, success) => {
        axios.patch(`${host}/api/users/${user._id}`, user, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    },
    deleteUser: (user, token, success) => {
        axios.delete(`${host}/api/users/${user._id}`, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    },
    
    updateUserRole: (role, id, token, success) => {
        axios.patch(`${host}/api/profiles/${id}`, {role: role}, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    },
    
    changePassword: (pass, id, changePass, token,  success) => {
        axios.patch(`${host}/api/users/${id}`, {password: pass, changePassword: changePass}, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    },

    getUsers: (token, success) => {
        axios.get(`${host}/api/users`, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
        success(res);
        })
    },
    getSingleUser: (id, token, success) => {               
        axios.get(`${host}/api/users/${id}`, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    },

    getPosts: (token, success) => {
        axios.get(`${host}/api/posts`, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    },
    getSitePosts: (skip, success) => {
        axios.get(`${host}/api/sitePosts?skip=${skip}`)
        .then(res => {
            success(res);
        })
    },
    getPostCount: (success) => {
        axios.get(`${host}/api/posts/count`)
        .then(res => {
            success(res);
        })
    },

    addPosts: (posts, userId, token, success) => {   
        axios.post(`${host}/api/posts`, {userId: userId, title: posts.title, 
            slug: posts.slug, content: posts.content, status: posts.status}, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    },
    updatePost: (post, token, success) => {
        axios.patch(`${host}/api/posts/${post._id}`, post, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    }, 
    deletePost: (post, token, success) => {
        axios.delete(`${host}/api/posts/${post._id}`, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    },
    deletePostImage: (postImage, pId, token, success) => {
        axios.delete(`${host}/api/postImages/${pId}`, postImage, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    },
    getSinglePost: (id, token, success) => {               
        axios.get(`${host}/api/posts/${id}`, {
            headers: {
                'access_token': token
            }
        })
        .then(res => {
            success(res);
        })
    },
    uploadImage: (data, postId, success) => {               
        axios.post(`${host}/api/postImages/upload/${postId}`, data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        .then(res => {
            success(res);
        })
    },
    getPostBySlug: (slug, success) => {
        axios.get(`${host}/api/sitePosts/${slug}`)
        .then(res => {
            success(res);
        })
    },
    getCommentById: (commentId, success) => {
        axios.get(`${host}/api/comments/${commentId}`)
        .then(res => {
            success(res);
        })
    },
    getComments: (success) => {
        axios.get(`${host}/api/comments`)
        .then(res => {
            success(res);
        })
    },
    postComment: (comment, token, success) => {
        axios.post(`${host}/api/comments`, comment, {
            headers: {
                'access_token': token
            }
        }).then(res => {
            success(res);
        })
    }
}

export default API;