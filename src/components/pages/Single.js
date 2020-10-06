import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '../common/Header';
import API from '../../utils/api';
import * as SiteActions from '../../store/actions/siteActions';
import { Link } from 'react-router-dom';
import CommentBuilder from '../common/CommentBuilder';

class Single extends Component{
    componentDidMount(){
        this.props.getSinglePost(this.props.match.params.slug);
        this.props.getComments();
    }
    render(){
        return(
            <div>
                <Header
                    title=""
                    className="bg-dark"
                    subtitle={this.props.site.post.title}
                    showButton={false}
                    image={
                        this.props.site.post.postImage ?
                            this.props.site.post.postImage.length > 0 ? 
                                API.makeFileURL(this.props.site.post.postImage[0].url)
                            : ''
                        : ''}
                />
                <div className="container">
                    <div className="row">
                        <div className="col-md-9">
                            <div className="post-content" dangerouslySetInnerHTML={{__html: this.props.site.post.content}} />
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-md-12">
                            <h3>Comments</h3>
                            {this.props.auth.user.token ? 
                                <CommentBuilder />
                            : 
                                <p>Need an account? <Link to="/signup"> Sign Up</Link></p>    
                            }
                        </div>
                    </div>
                    <div className="row">
                        {this.props.site.post.comments ?
                            this.props.site.post.comments.length > 0 ?
                                this.props.site.post.comments.map((comment, i) => {
                                    return (
                                        <div className="col-md-12"> 
                                            {comment.profile && comment.postId === this.props.site.post._id ? 
                                                <div>
                                                    <h4>{comment.profile.name}</h4>
                                                    <p>{comment.content}</p>
                                                </div>
                                            : ''}
                                        </div>
                                    )
                                })
                            : null
                        :null}
                    </div>
                </div>               
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    site: {
        post: state.site.post
    }
})

const mapDispatchToProps = dispatch => ({
    getSinglePost: (slug) => {
        dispatch(SiteActions.getPostBySlug(slug));
    },
    getComments: () => {
        dispatch(SiteActions.getComments());
    }

})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Single);