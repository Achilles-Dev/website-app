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
        });
    },
    getUser: (userId, token, success) => {
        axios.get(`${host}/api/users/${userId}?access_token=${token}`,{
            params: {
                filter: {
                    include: 'Profile',
                }
            }
        }).then(res => {
            success(res);
        });
    },
    register: (name, email, pass, success) => {
        axios.post(`${host}/api/users`, {name: name, email: email, password: pass})
        .then(res => {
            success(res);
        })
        .catch(err => {
            success(err);
        })
    },
    addUsers: (user, token, success) => {
        axios.post(`${host}/api/users?access_token=${token}`, user)
        .then(res => {
            success(res);
        })
        .catch(err => {
            success(err);
        })
    },
    updateUser: (user, token, success) => {
        axios.patch(`${host}/api/users/${user.id}?access_token=${token}`, user)
        .then(res => {
            success(res);
        })
    },
    deleteUser: (user, token, success) => {
        axios.delete(`${host}/api/users/${user.id}?access_token=${token}`, user)
        .then(res => {
            success(res);
        })
    },
    updateUserRole: (role, id, token, success) => {
        axios.patch(`${host}/api/Profiles/${id}?access_token=${token}`, {role: role})
        .then(res => {
            success(res);
        })
    },
    deleteUserRole: (role, id, token, success) => {
        axios.delete(`${host}/api/Profiles/${id}?access_token=${token}`, {role: role})
        .then(res => {
            success(res);
        })
    },

    getUsers: (token, success) => {
        axios.get(`${host}/api/users?access_token=${token}`)
        .then(res => {
        success(res);
        })
    },
    getSingleUser: (id, token, success) => {               
        axios.get(`${host}/api/users/${id}?access_token=${token}`, {
            params: {
                filter: {
                    include: 'Profile'
                }
            }
        })
        .then(res => {
            success(res);
        })
    },

    getPosts: (token, success) => {
        axios.get(`${host}/api/Posts?access_token=${token}`)
        .then(res => {
            success(res);
        })
    },
    getSitePosts: (skip, success) => {
        axios.get(`${host}/api/Posts`, {
            params: {
                filter: {
                    skip: skip,
                    limit: 5,
                    include: 'PostImage',
                    fields: {
                        id: true,
                        title: true,
                        slug: true
                    }
                }
            }
        })
        .then(res => {
            success(res);
        })
    },
    getPostCount: (success) => {
        axios.get(`${host}/api/Posts/count`)
        .then(res => {
            success(res);
        })
    },

    addPosts: (post, token, success) => {   
        axios.post(`${host}/api/Posts?access_token=${token}`, post)
        .then(res => {
            success(res);
        })
    },
    updatePost: (post, token, success) => {
        axios.patch(`${host}/api/Posts/${post.id}?access_token=${token}`, post)
        .then(res => {
            success(res);
        })
    }, 
    deletePost: (post, token, success) => {
        axios.delete(`${host}/api/Posts/${post.id}?access_token=${token}`, post)
        .then(res => {
            success(res);
        })
    },
    deletePostImage: (postImage, pId, token, success) => {
        axios.delete(`${host}/api/PostImages/${pId}?access_token=${token}`, postImage)
        .then(res => {
            success(res);
        })
    },
    getSinglePost: (id, token, success) => {               
        axios.get(`${host}/api/Posts/${id}?access_token=${token}`, {
            params: {
                filter: {
                    include: 'PostImage'
                }
            }
        })
        .then(res => {
            success(res);
        })
    },
    uploadImage: (data, token, postId, userId, success) => {               
        axios.post(`${host}/api/PostImages/upload?post_id=${postId}&access_token=${token}&user_id=${userId}`, data)
        .then(res => {
            success(res);
        })
    },
    getPostBySlug: (slug, token, success) => {
        axios.get(`${host}/api/Posts/findOne?access_token=${token}`, {
            params: {
                filter: {
                    where: {slug: slug},
                    include: ['PostImage',{Comments: 'Profile'}],
                    
                }
            }
        }).then(res => {
            success(res);
        })
    },
    getCommentById: (commentId, token, success) => {
        axios.get(`${host}/api/Comments/${commentId}?access_token=${token}`, {
            params: {
                filter: {
                    include: 'Profile',
                }
            }
        }).then(res => {
            success(res);
        })
    },
    postComment: (comment, token, success) => {
        axios.post(`${host}/api/Comments?access_token=${token}`, comment, {
            params: {
                filter: {
                    include: 'Profile',
                }
            }
        }).then(res => {
            success(res);
        })
    }
}

export default API;