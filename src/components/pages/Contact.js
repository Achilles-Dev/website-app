import React, { Component} from 'react';
import Field from '../common/Field'
import {withFormik} from 'formik';
import * as Yup from 'yup';
const fields = {
    sections: [
        [
            {name: 'name', elementName: 'input', type: 'text', placeholder: 'Your name' },
            {name: 'email', elementName: 'input', type: 'email', placeholder: 'Your email' },
            {name: 'phone', elementName: 'input', type: 'text', placeholder: 'Your phone number' },
        ],
        [
            {name: 'message', elementName: 'textarea', type: 'text', placeholder: 'Type your message' },
        ]
    ]
}

class Contact extends Component {

    submitForm = (e) => {
        alert("Form submitted, Thank you!")
    }


    render(){
        return(
            <div>
            <section className="page-section" id="contact">
                <div className="container">
                    <div className="text-center">
                        <h2 className="section-heading text-uppercase">Contact Us</h2>
                        <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
                    </div>
                        
                        <form id="contactForm" onSubmit={this.props.handleSubmit}  name="sentMessage" noValidate="novalidate">                       
                            <div className="row align-items-stretch mb-5">
                            {fields.sections.map((section, sectionIndex) => {
                                    return (
                                        <div className="col-md-6" key={sectionIndex}>
                                            {section.map((field, i) => {
                                                return <Field 
                                                            {...field} 
                                                            key={i} 
                                                            value={this.props.values[field.name]}
                                                            name={field.name}
                                                            onChange={this.props.handleChange}
                                                            onBlur={this.props.handleBlur}
                                                            touched={(this.props.touched[field.name])}
                                                            errors={this.props.errors[field.name]}
                                                        />
                                            })}
                                        </div>
                                    )
                                })}
                                
                                </div>
                                <div className="text-center">
                                    <div id="success"></div>
                                    <button className="btn btn-primary btn-xl text-uppercase" 
                                        type="submit">
                                        Send Message
                                    </button>
                                </div>                           
                        </form>                    
                </div>
            </section>
            </div>
        )
    }
}

export default withFormik({
    mapPropsToValues: () => ({
        name: '',
        email: '',
        phone: '',
        message: '',
    }),

    validationSchema: Yup.object().shape({
        name: Yup.string().min(3, 'Your name should be longer').required('You must give us your name.'),
        email: Yup.string().email('Provide a valid email').required('You must give us your email address.'),
        phone: Yup.string().min(10,'Your number should be at least 10.')
                .max(15, 'Your number should be at most 15.')
                .required('You must give us your phone number.'),
        message: Yup.string().required('You must provide a message.')
    
    }),

    handleSubmit: (values, {setSubmitting}) => {
        console.log("Values", values);
        alert("You've submitted the form", JSON.stringify(values));
    }
})(Contact);