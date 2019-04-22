import React, {Component} from 'react';
import {Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Login from './Components/Login/Login';
import Student from './Components/Student/Student';
import Company from './Components/Company/Company';
import Admin from './Components/Admin/Admin'

class Router extends Component{
    state = {
        currentUser: JSON.parse(localStorage.getItem("currentUser")),
    }
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <PrivateRoute exact path="/student" component={Student}/>
                    <PrivateRoute exact path="/company" component={Company}/>
                    <PrivateRoute exact path="/admin" component={Admin}/>
                </Switch>
            </BrowserRouter>
        );
    }
}
const PrivateRoute = ({ component: Component,currentUser,...rest})=>{
    const user = JSON.parse(localStorage.getItem("currentUser"));
    console.log()
    if(user!==null){
        console.log('yahan tu aya');
        return <Route {...rest} render={(props)=> <Component {...props}/>} />
    }else{
        return <Route {...rest} render={(props) => <Login history={props.history} routeTo={props.path} />} />
    }
}

export default Router;