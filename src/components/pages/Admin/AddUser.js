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
        margin: theme.spacing.unit * 3,
        display: 'flex',
        flexDirection: 'row wrap',
        width: '100%'
    },
})

class AddUser extends Component{
    componentDidUpdate(props, state){
        if (this.props.match.params.view === 'add' && 
            this.props.admin.users.filter(u => u.name === this.props.values.name).length > 0){
                const user = this.props.admin.users.filter(u => u.name === this.props.values.name)[0];
                this.props.history.push('/admin/users/edit' + user.dispatch);
            }
        
        if (this.props.admin.user.id !== props.admin.user.id){
            //when redux state changes post in admin reducer
            this.props.setValues(this.props.admin.user);
           
        } 
    }

    componentDidMount(props, state){
        if (this.props.match.params.view === 'edit' && this.props.match.params.id){
            this.props.getSingleUser(this.props.match.params.id, this.props.auth.token)
        }
    }
    render(){
      
        return(
            <div>
                <Form >
                
                    <Paper >
                        <FormikTextField 
                            name="name"
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
                        {this.props.match.params.view === 'edit' ? 
                            <FormikTextField 
                                name="Profile.role"
                                label="User role"
                                margin="normal"
                                fullWidth
                            />
                        :null}                       
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
                                        this.props.deleteUser(this.props.admin.user, this.props.auth.token);
                                        this.props.deleteUserRole(this.props.admin.user.Profile.role, this.props.admin.user.Profile.id, this.props.auth.token);        
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
    },
    deleteUserRole: (role, id, token) => {
        dispatch(AdminActions.deleteUserRole(role, id, token));
    },
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: (props) => {
        if (props.match.params.view === 'edit' && !props.admin.user.Profile){
            return {
                email: props.admin.user.email || '', 
                name: props.admin.user.name || '',
                Profile: {
                    role: '',
                }
            }           
        } else if (props.match.params.view === 'edit' && props.admin.user.Profile.role){
            return {
                email: props.admin.user.email || '', 
                name: props.admin.user.name || '',
                Profile: {
                    role: props.admin.user.Profile.role || '',
                }
            }
        }
        else {
            return {
                email: '', 
                name: '',               
                Profile: {
                    role: '',
                }
                
            }
        }     
    },
    validationSchema: Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('You email address is required'),
        name: Yup.string().required('Your username is required'),        
    }),
    handleSubmit: (values, {setSubmitting, props}) => {
        if (props.match.params.view === 'edit'){
            const user = {
                ...values,
                id: props.match.params.id
            }
            props.updateUser(user, props.auth.token);
            props.updateUserRole(user.Profile.role, user.Profile.id, props.auth.token);
        } else {
            props.addUsers(values, props.auth.token); 
        }
       
    }
    
})(withStyles(styles)(AddUser))));