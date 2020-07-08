import React, {Component} from 'react';
import PageWrapper from './components/PageWrapper';
import AdminWrapper from './components/AdminWrapper';
import LoginWrapper from './components/LoginWrapper';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

//Pages
import Home from './components/pages/Home';
import About from './components/pages/About';
import Services from './components/common/Services';
import Contact from './components/pages/Contact';
import Portfolio from './components/common/Portfolio';
import Team from './components/common/Team';
import Login from './components/pages/Login'
import Blog from './components/pages/Blog'
import Single from './components/pages/Single'
import Signup from './components/pages/Signup';

//Admin pages
import Dashboard from './components/pages/Admin/Dashboard';  
import Users from './components/pages/Admin/Users';  
import Posts from './components/pages/Admin/Posts'; 
import AddPost from './components/pages/Admin/AddPost';
import AddUser from './components/pages/Admin/AddUser';



class App extends Component {
  render(){
   
    return(
      <div>
        <Router>
       
          <Route
            exact={true}
            path="/admin/users/:view/:id"
            render={props => {
              return (
                  <div>
                    {this.props.auth.token ?
                    
                    <AdminWrapper title={
                      !this.props.auth.user.Profile ?
                      ""
                      : this.props.auth.user.Profile.role.charAt(0).toUpperCase() + this.props.auth.user.Profile.role.slice(1)
                    }>
                      <AddUser/>
                    </AdminWrapper>
                    :
                    <LoginWrapper>
                      <Login/>
                    </LoginWrapper>                    
                    }                                    
                  </div>                 
              )
            }}
          />

          <Route
            exact={true}
            path="/admin/users/:view"
            render={props => {
              return (
                  <div>
                    {this.props.auth.token ?
                    <AdminWrapper title={
                      !this.props.auth.user.Profile ?
                      ""
                      : this.props.auth.user.Profile.role.charAt(0).toUpperCase() + this.props.auth.user.Profile.role.slice(1)
                    }>
                      <AddUser/>
                    </AdminWrapper>
                    :
                    <LoginWrapper>
                      <Login/>
                    </LoginWrapper>                    
                    }                                    
                  </div>                 
              )
            }}
          />

          <Route
            exact={true}
            path="/admin/users"
            render={props => {
              return (
                  <div>
                    {this.props.auth.token ?
                    <AdminWrapper title={
                      !this.props.auth.user.Profile ?
                      ""
                      : this.props.auth.user.Profile.role.charAt(0).toUpperCase() + this.props.auth.user.Profile.role.slice(1)
                    }>
                      <Users/>
                    </AdminWrapper>
                    :
                    <LoginWrapper>
                      <Login/>
                    </LoginWrapper>                    
                    }                                    
                  </div>                 
              )
            }}
          />
          
          <Route
            exact={true}
            path="/admin/posts/:view/:id"
            render={props => {
              return (
                  <div>
                    {this.props.auth.token ?
                    <AdminWrapper title={
                      !this.props.auth.user.Profile ?
                      ""
                      : this.props.auth.user.Profile.role.charAt(0).toUpperCase() + this.props.auth.user.Profile.role.slice(1)
                    }>
                      <AddPost/>
                    </AdminWrapper>
                    :
                    <LoginWrapper>
                      <Login/>
                    </LoginWrapper>                    
                    }                                    
                  </div>                 
              )
            }}
          />

          <Route
            exact={true}
            path="/admin/posts/:view"
            render={props => {
              return (
                  <div>
                    {this.props.auth.token ?
                    <AdminWrapper title={
                      !this.props.auth.user.Profile ?
                      ""
                      : this.props.auth.user.Profile.role.charAt(0).toUpperCase() + this.props.auth.user.Profile.role.slice(1)
                    }>
                      <AddPost/>
                    </AdminWrapper>
                    :
                    <LoginWrapper>
                      <Login/>
                    </LoginWrapper>                    
                    }                                    
                  </div>                 
              )
            }}
          />

          <Route
            exact={true}
            path="/admin/posts"
            render={props => {
              return (
                  <div>
                    {this.props.auth.token ?
                    <AdminWrapper title={
                      !this.props.auth.user.Profile ?
                      ""
                      : this.props.auth.user.Profile.role.charAt(0).toUpperCase() + this.props.auth.user.Profile.role.slice(1)
                    }>
                      <Posts/>
                    </AdminWrapper>
                    :
                    <LoginWrapper>
                      <Login/>
                    </LoginWrapper>                    
                    }                                    
                  </div>                 
              )
            }}
          />

          <Route
            exact={true}
            path= "/admin"
            render={props => {
              return (
                  <div>
                    {this.props.auth.token ?
                    <AdminWrapper title={
                      !this.props.auth.user.Profile ?
                      ""
                      : this.props.auth.user.Profile.role.charAt(0).toUpperCase() + this.props.auth.user.Profile.role.slice(1)
                    }>
                      <Dashboard/>
                    </AdminWrapper>
                    :
                    <LoginWrapper>
                      <Login/>
                    </LoginWrapper>                   
                    }                                    
                  </div>                  
              )
            }}
          />

          <Route
            exact={true}
            path="/signup"
            render={props => {
              if (this.props.auth.token){
                return (
                  <Redirect to="/" />
                )
              } else{
                return (
                  <LoginWrapper>
                    <Signup />
                  </LoginWrapper>
                )
              }
            }}
          />
          <Route
            exact= {true}
            path="/"
            render={props => (
              <PageWrapper>
                <Home {...props}/>
              </PageWrapper>
            )}
          />

          <Route
            path="/about"
            render={props => (
              <PageWrapper>
                <About {...props}/>
              </PageWrapper>
            )}
          />
          <Route
            exact={true}
            path="/blog/:slug"
            render={props => (
              <PageWrapper>
                <Single {...props}/>
              </PageWrapper>
            )}
          />
          <Route
            exact={true}
            path="/blog"
            render={props => (
              <PageWrapper>
                <Blog {...props}/>
              </PageWrapper>
            )}
          />

          <Route
            path="/services"
            render={props => (
              <PageWrapper>
                <Services {...props}/>
              </PageWrapper>
            )}
          />

          <Route 
            path="/contact"
            render={props => (
              <PageWrapper>
                <Contact {...props}/>
              </PageWrapper>
            )}
          />

          <Route 
            path="/portfolio"
            render={props => (
              <PageWrapper>
                <Portfolio {...props}/>
              </PageWrapper>
            )}
          />

          <Route 
            path="/team"
            render={props => (
              <PageWrapper>
                <Team {...props}/>
              </PageWrapper>
            )}
          />
      
        </Router>
        
      </div>
    );
  }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
