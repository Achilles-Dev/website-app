import React, {Component} from 'react';
import * as SiteActions from '../../store/actions/siteActions'
import {connect} from 'react-redux';
import { withFormik } from 'formik';
import * as Yup from 'yup';
import Field from './Field';

const fields = [    
    {name: 'content', elementName: 'input', type: 'text', placeholder: 'Write your comment' },
    
];

class CommentBuilder extends Component{
    render(){
        return(
            <div>
                <form onSubmit={e => {
                    e.preventDefault();
                    const comment = {
                        content: this.props.values.content,
                        postId: this.props.site.post._id,
                        profileId: this.props.auth.profile._id,
                        userId: this.props.auth.user.user._id                       
                    }
                    this.props.postComment(comment, this.props.auth.user.token);              
                }}>
                        <Field
                            {...fields[0]}
                            value={this.props.values[fields[0].name]}
                            name={fields[0].name}
                            onChange={this.props.handleChange}
                            onBlur={this.props.handleBlur}
                            touched={(this.props.touched[fields[0].name])}
                            errors={this.props.errors[fields[0].name]}
                        />
                        <button type="submit" className="btn btn-primary">Submit</button>
                </form>
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    site: state.site,
})

const mapDispatchToProps = dispatch => ({
    postComment: (comment, token) => {
        dispatch(SiteActions.postComment(comment, token));
    }
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: () => ({
        content: ''
    }),
    validationSchema: Yup.object().shape({
        content: Yup.string().required('Add comment')
    }),
    
})(CommentBuilder));