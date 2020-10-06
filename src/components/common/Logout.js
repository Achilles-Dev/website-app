import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';

class Logout extends Component{
    state = {
        navigate: false,
    }

    logout = () => {
        localStorage.clear("token");
        this.setState({ navigate: true})
    }

    render(){
        const {navigate} = this.state;
        if (navigate) {
            return <Redirect to="/" push={true} />
        }

        return  <Button 
                    className="text-white"
                    onClick={this.logout}>                                           
                    Log out
                </Button>
        
    }
}

const mapStateToProps = state => ({   
       auth: state.auth   
});
const mapDispatchToProps =  dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);