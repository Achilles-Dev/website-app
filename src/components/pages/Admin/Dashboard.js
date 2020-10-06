import React, {Component} from 'react';
import {withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Dashboard extends Component {
 
  
    render() {
        if(this.props.auth.user.changePassword === 1){
            return (<Redirect to="/changePassword" />)
        } else {
            return(
                <h1>You are logged in with token: {this.props.auth.user.token}</h1>
            )
        }
        
    }
}

const mapStateToProps = state => ({
      auth: state.auth    
  })
  
  const mapDispatchToProps = dispatch => ({
      
  })
  

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard));