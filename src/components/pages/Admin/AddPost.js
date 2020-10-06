import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as AdminActions from '../../../store/actions/adminActions';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {FormikTextField, FormikSelectField} from 'formik-material-fields';
import Button from '@material-ui/core/Button';
import {withFormik, Form} from 'formik';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import ImageIcon from '@material-ui/icons/Image';
import {withRouter} from 'react-router-dom';
import * as Yup from 'yup';
import API from '../../../utils/api'; 
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

/* global $ */
const styles = theme => ({
    container: {
        margin: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row wrap',
        width: '100%'
    },
    postImage: {
        width: '100%'
    },
    formControl: {
        margin: theme.spacing(1)
    },
    leftSide: {
        flex: 4,
        height: '100%',
        margin: theme.spacing(1),
        padding: theme.spacing(3),
    },
    rightSide: {
        flex: 1,
        height: '100%',
        margin: theme.spacing(1),
        padding: theme.spacing(3),
    },
    Save: {
        marginBottom: theme.spacing(2), 
    }
})

class AddPost extends Component{
    componentDidUpdate(props, state){
        if (this.props.match.params.view === 'add' && 
            this.props.admin.posts.filter(p => p.title === this.props.values.title).length > 0){
                const post = this.props.admin.posts.filter(p => p.title === this.props.values.title)[0];
                this.props.history.push('/admin/posts/edit' + post.dispatch);
            }
        
        if (this.props.admin.post._id !== props.admin.post._id){
            //when redux state changes post in admin reducer
            this.props.setValues(this.props.admin.post);
        } 
    }

    uploadImage = (e) => {
        const data = new FormData();
        data.append('file', e.target.files[0], new Date().getTime().toString() + e.target.files[0].name);
        this.props.uploadImage(data, this.props.admin.post._id)
    }

    componentDidMount(props, state){
        if (this.props.match.params.view === 'edit' && this.props.match.params.id){
            this.props.getSinglePost(this.props.match.params.id, this.props.auth.user.token)
        }
    }

    modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{'header': 1}, {'header': 2}],
            [{'list': 'ordered'}, {'list': 'bullet'}],
            [{'indent': '-1'}, {'indent': '+1'}],
            [{'size': ['small', 'medium', 'large', 'huge']}],
            [{'color': []}, {'background': []}],
            ['image'],  
            ['clean'],
        ]
    }

    formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote', 'script',
        'list', 'bullet', 'indent',
        'link', 'image', 'color', 'code-block'
    ]
    render(){
        const {classes} = this.props;
        return(
            <div >
          
                <Form className={classes.container}>
                    <Paper className={classes.leftSide}>
                        <FormikTextField 
                            name="title"
                            label="Title"
                            margin="normal"
                            onChange={e => this.props.setFieldValue('slug', 
                                e.target.value.toLowerCase().replace(/ /g, '_'))}
                            fullWidth
                        />
                        <FormikTextField 
                            name="slug"
                            label="Slug"
                            margin="normal"
                            
                        />  
                        <ReactQuill
                            value={this.props.values.content}
                            modules={this.modules}
                            format={this.formats}
                            placeholder="Write some cool stuff"
                            onChange={val => this.props.setFieldValue('content', val)}
                        />
                                        
                    </Paper>
                    <Paper className={classes.rightSide}>
                        <FormikSelectField
                            name="status"
                            label="Status"
                            margin="normal"
                            fullWidth
                            options={[
                                {label: 'unpublished', value: false},
                                {label: 'published', value: true}                        
                            ]}
                        />
                        <div className={classes.Save}>
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
                                className="mt-3"
                                onClick={e => {
                                    if (window.confirm('Are you sure you want to delete this post?')){
                                            this.props.deletePost(this.props.admin.post, this.props.auth.user.token);
                                            //this.props.deletePostImage(this.props.admin.post.PostImage[0], this.props.admin.post.PostImage[0].id, this.props.auth.user.token);
                                    }
                                }}
                            ><DeleteIcon />Delete</Button>
                            : null}
                            
                        </div>

                        {this.props.admin.post.postImage && this.props.match.params.view === 'edit'? 
                            this.props.admin.post.postImage.length > 0 ?
                            <img src={API.makeFileURL(this.props.admin.post.postImage[0].url, this.props.auth.user.token)} className={classes.postImage} alt="img"/>
                            : null
                        : null}
                        <div>
                            <Button 
                                variant="contained" 
                                color="primary"
                                onClick={e => {
                                    $('.myFile').trigger('click');
                                }}
                            ><ImageIcon />Upload Post Image</Button>
                            <input type="file" style={{display: 'none'}} className="myFile" 
                                onChange={this.uploadImage} />
                        </div>   
                    </Paper>
                </Form>
            </div>
            
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    admin: {
        post: state.admin.post
    }
});

const mapDispatchToProps = dispatch => ({
    addPosts: (posts, userId, token) => {
        dispatch(AdminActions.addPosts(posts, userId, token));
    },
    updatePost: (post, token) => {
        dispatch(AdminActions.updatePost(post, token));
    },
    getSinglePost: (id, token) => {
        dispatch(AdminActions.getSinglePost(id, token));
    },
    uploadImage: (data, postId) => {
        dispatch(AdminActions.uploadImage(data, postId));
    },
    deletePost: (post, token) => {
        dispatch(AdminActions.deletePost(post, token));
    },
    deletePostImage: (postImage, pId, token) => {
        dispatch(AdminActions.deletePostImage(postImage, pId, token));
    }
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(withFormik({
    mapPropsToValues: (props) => {
        if (props.match.params.view === 'edit'){
           return {
                title: props.admin.post.title || '',
                slug:  props.admin.post.slug || '',
                status:  props.admin.post.status || false,
                content: props.admin.post.content || '',
                postImage: props.admin.post.postImage[0] || ''
            }            
        } else {
            return {
                title: '',
                slug: '',
                status: false,
                content: '',
                postImage: ''        
            }
        }
        
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().required('Title is required'),
    }),
    handleSubmit: (values, {setSubmitting, props}) => {
        console.log("Saving");
        if (props.match.params.view === 'edit'){
            const post = {
                ...values,
                _id: props.match.params.id
            }
            props.updatePost(post, props.auth.user.token)
        } else {
            const posts = {
                ...values               
            }
            props.addPosts(posts, props.auth.user.user._id ,props.auth.user.token); 
        }
       
    }
})(withStyles(styles)(AddPost))));