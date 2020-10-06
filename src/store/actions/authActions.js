import API from "../../utils/api"

export const login = (email, pass) => {
    return (dispatch) => {       
        API.login(email, pass, res => {
            dispatch({
                type: 'LOGIN',
                payload: {
                    token: res.data.token,
                    user: res.data.user
                }
            })
            API.getUserProfile(res.data.user._id, res2 => {
                
                dispatch({
                    type: 'AFTER_LOGIN',
                    payload: {
                        profile: res2.data
                    }
                })
            })
            
        })
    }

    
    /* return {
        type: 'LOGIN',
        payload: {email, pass}
    } */
}

export const register = (name, email, pass) => {
    return dispatch => {
        API.register(name, email, pass, res => {
            if(res.status === 200){
                dispatch(login(email, pass));
            } else{
                if (res){
                    dispatch({
                        type: 'SHOW_ERROR',
                        payload: 'There was an error, Do you already have an account?'
                    })
                }
            } 
        }) 
    }
    /* type: 'REGISTER',
        payload: {email, pass}*/
}

export const changePassword = (pass, id, changePass,token) => {
    return dispatch => {
        API.changePassword(pass, id, changePass, token,  res => {
            dispatch({
                type: 'PASSWORD_CHANGED',
                payload: res.data
            })
        })
    }
}
