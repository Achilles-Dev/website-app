import React, {Component} from 'react';
import Field from '../common/Field'
import {withFormik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import * as AuthActions from '../../store/actions/authActions';


const fields = [    
    {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your email' },
    {name: 'password', elementName: 'input', type: 'password', placeholder: 'Your password' },
];

class Login extends Component {
    render(){
        return(
            <div className="login-page">
                <div className="container">
                    <div className="login-form">
                            <div className="row">
                                <h1>Login</h1>
                            </div>
                            <div className="row">
                            <form onSubmit={e => {
                                e.preventDefault();
                                this.props.login(this.props.values.email, 
                                    this.props.values.password);
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
                                    <button type="submit" className="btn btn-primary">Login</button>
                                </div>
                            </form>
                            </div> 
                    </div>
                </div>
            </div>
        )
    }
} 

const mapStateToProps = state => {
    return {
       auth: state.auth 
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email,pass) => {
           dispatch(AuthActions.login(email, pass));
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: () => ({
        content: '',
    }),
    validationSchema: Yup.object().shape({
        content: Yup.string().required('Your comment needs to have text'),
    }),
    
})(Login));