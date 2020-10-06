import React, {Component} from 'react';
import Field from '../common/Field'
import {withFormik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import * as AuthActions from '../../store/actions/authActions';


const fields = [    
    {name: 'password1', elementName: 'input', type: 'password', placeholder: 'Current password' },
    {name: 'password2', elementName: 'input', type: 'password', placeholder: 'New password' },
    {name: 'password3', elementName: 'input', type: 'password', placeholder: 'New password again' },
];


class ResetPassword extends Component {
    componentDidUpdate = (props, state) => {
        if (this.props.auth.user.changePassword !== props.auth.user.changePassword){
            this.props.setValues(this.props.auth.user.changePassword);
        }
    } 

    componentDidMount = () => {

    }
    render(){
        return(
            <div className="login-page">
                <div className="container">
                    <div className="login-form">
                            <div className="row">
                                <h1>Change Password</h1>
                            </div>
                            <div className="row">
                            <form onSubmit={e => {
                                e.preventDefault();
                                this.props.changePassword(this.props.values.password2, 
                                    this.props.auth.user.id, this.props.auth.user.changePassword - 1, this.props.auth.token);
                                console.log("chanePassword: " , this.props.auth.user.changePassword - 1 );
                            }}>
                                {fields.map((f, i) => {
                                    return (
                                        <div className="col-md-12">
                                        <Field
                                        key={i}
                                        {...f}
                                        value={this.props.values[f.name]}
                                        name={f.name}
                                        onChange={this.props.handleChange}
                                        onBlur={this.props.handleBlur}
                                        touched={(this.props.touched[f.name])}
                                        errors={this.props.errors[f.name]}
                                        />
                                        </div> 
                                    )
                                })}
                                <div className="col-md-12">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                            </div> 
                    </div>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = state => ({
       auth: state.auth 
})

const mapDispatchToProps = dispatch => ({
        changePassword: (pass, id, changePass, token) => {
           dispatch(AuthActions.changePassword(pass, id, changePass, token));
        }
        
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: () => ({
        password1: '',
        password2: '',
        password3: '',
    }),
    validationSchema: Yup.object().shape({
        password1: Yup.string().required('Enter your current password'),
        password2: Yup.string().min(8, 'Password needs to be at least 8 characters long').required('Enter your new password'),
        password3: Yup.string().required('Enter your new password again').test('pass-match', 'Passwords don\'t match', function(value){
            const {password2} = this.parent;
            return password2 === value;
        })
    }),
    
})(ResetPassword));