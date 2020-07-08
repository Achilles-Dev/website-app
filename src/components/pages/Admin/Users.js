import React, {Component} from 'react';
import TableView from '../../common/TableView'
import {connect} from 'react-redux';
import * as AdminActions from '../../../store/actions/adminActions';
import Fab from '@material-ui/core/Fab';
import {Link as RouterLink} from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import {withStyles} from '@material-ui/core/styles';

const columns = [
    {label: 'ID', name: 'id'},
    {label: 'Email', name: 'email'},
    {label: 'Name', name: 'name'}
]

const styles = theme => ({
    fab: {
        position: 'fixed',
        bottom: '50px',
        right: '50px'
    }
});

class Users extends Component {

    componentDidMount(){
        this.props.getUsers(this.props.auth.token);
    }
    render() {
        const users = this.props.admin.users;
        const {classes} = this.props;
        return(
            <div>
                <h1>Users</h1>
                <TableView 
                    columns={columns}
                    rows={users}
                />
                {users ? 
                    users.length > 0 ?
                        <Fab component={RouterLink} to="/admin/users/add" color="secondary" 
                            aria-label="Add" className={classes.fab}> <EditIcon />               
                        </Fab>
                    : null
                : null}
                
            </div>       
        )
    }
}

const mapStateToProps = state =>{
    return {
      auth: state.auth,
      admin: state.admin
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        getUsers: (token) => {
            dispatch(AdminActions.getUsers(token));
        }
    }
  }

export default connect(
    mapStateToProps,
    mapDispatchToProps  
)(withStyles(styles)(Users));