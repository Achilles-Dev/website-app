import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as AdminActions from '../../../store/actions/adminActions';
import {withStyles} from '@material-ui/core/styles';
import {FormikTextField} from 'formik-material-fields';
import Paper from '@material-ui/core/Paper';
import {withFormik, Form} from 'formik';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import {withRouter} from 'react-router-dom';
import { Button } from '@material-ui/core';
import * as Yup from 'yup';

const styles = theme => ({
    container: {
        margin: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row wrap',
        width: '100%'
    },
})

class AddUser extends Component{
    componentDidUpdate(props, state){
               
        if (this.props.admin.user._id !== props.admin.user._id ){
            //when redux state changes post in admin reducer
            this.props.setValues(this.props.admin.user);
            this.props.setFieldValue('role', this.props.admin.profile.role) 
                
        } 
        

        
    }

    componentDidMount(props, state){
        if (this.props.match.params.view === 'edit' && this.props.match.params.id){
            this.props.getSingleUser(this.props.match.params.id, this.props.auth.user.token)
        }
        
    }
    render(){
      
        return(
            <div>
                <Form >
                
                    <Paper >
                        <FormikTextField 
                            name="username"
                            label="Username"
                            margin="normal"
                            fullWidth
                        />
                        <FormikTextField 
                            name="email"
                            label="Email Address"
                            margin="normal"
                            fullWidth
                        />
                        {this.props.match.params.view === 'add' ?
                            <FormikTextField 
                                name="password"
                                label="Password"
                                margin="normal"
                                fullWidth
                            />
                        : <FormikTextField 
                            name="role"
                            label="User role"
                            margin="normal"
                            fullWidth
                          />
                        }                     
                        <br/>
                        <br/>
                        <div >
                            <Button                                 
                               variant="contained" 
                               color="secondary"
                               onClick={e => {                              
                                this.props.handleSubmit()
                               }}                           
                            ><SaveIcon />Save</Button>
                            {this.props.match.params.view === 'edit' ? 
                                <Button                                 
                                variant="contained" 
                                color="secondary"
                                className="ml-3"
                                onClick={e => {

                                    if (window.confirm('Are you sure you want to delete this user?')){
                                        this.props.deleteUser(this.props.admin.user, this.props.auth.user.token);
                                            
                                    }
                                }}                           
                                ><DeleteIcon />Delete</Button>
                            : null}
                        </div>
                        <br/>
                        
                    </Paper>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    admin: state.admin
})

const mapDispatchToProps = dispatch => ({
    addUsers: (user, token) => {
        dispatch(AdminActions.addUsers(user, token));
    },
    updateUser: (user, token) => {
        dispatch(AdminActions.updateUser(user, token));
    },
    getSingleUser: (id, token) => {
        dispatch(AdminActions.getSingleUser(id, token));
    },
    updateUserRole: (role, id, token) => {
        dispatch(AdminActions.updateUserRole(role, id, token));
    },
    deleteUser: (user, token) => {
        dispatch(AdminActions.deleteUser(user, token));
    }
    
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: (props) => {
        if (props.match.params.view === 'edit'){
            return {
                email: props.admin.user.email || '', 
                username: props.admin.user.username || '',
                role:  props.admin.profile.role || '',
            }           
        } 
        
        else {
            return {
                email: '', 
                username: '',               
                password: ''
                
            }
        }     
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('You email address is required'),
        username: Yup.string().required('Your username is required'),
        password: Yup.string().required('Your password is required'),        
    }),
    handleSubmit: (values, {setSubmitting, props}) => {
        if (props.match.params.view === 'edit'){
            const user = {
                ...values,
                _id: props.match.params.id
            }
            props.updateUser(user, props.auth.user.token);
            props.updateUserRole(user.role, props.admin.profile._id, props.auth.user.token);
        } else {
            const user = {
                ...values
            }
            props.addUsers(user, props.auth.user.token); 
        }
       
    }
    
})(withStyles(styles)(AddUser))));