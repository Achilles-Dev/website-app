import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Dashboard extends Component {
 
  
    render() {
        return(
        <h1>You are logged in with token: {this.props.auth.token}</h1>
        )
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