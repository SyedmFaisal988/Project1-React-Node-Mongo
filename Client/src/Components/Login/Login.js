import React, { Component } from 'react';
import './Login.css';
import Input from './Input';
import loginImg from '../../images/login2.png'

class Login extends Component {
    state = {
        users:[
            {id:0, username:"admin", password:"admin", status: "admin"},
            {id:1, username: "faisal", password:"12345", status: "student"},
        ],
        currentUser: null,
        errors:{
            hasError: false,
            errorObj: {},
            serverError: null,
        },
        userName: "",
        passWord: "",
        status: "",
        displayError: false,
    }
    Submit = (event) => {
        const {userName, passWord, users} = this.state;
        const { routeTo } = this.props;
        event.preventDefault();
        const currentUser = users.filter((user)=>{return user.username===userName&&user.password===passWord});
        if(currentUser.length){
            localStorage.setItem("currentUser", JSON.stringify(currentUser[0]));
            if(routeTo===undefined){
                console.log('current user', currentUser[0].status);
                this.props.history.push('/'+currentUser[0].status);
            }else{
                this.props.history.push(routeTo);
            }

        }
        else {
            this.setState({
                displayError: true
            })
        }
    }
    onChangeWithInputs = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    render() {
        const {userName, passWord} = this.state;
        return (
            <div className="loginContainer">
                <div className="login-form-wrapper valign-wrapper">
                    <form id="login-form" onSubmit={this.Submit} className=" col s10 form-wrap">
                    <div className="login-header">
                        <img className="resize" width="150px" src={loginImg} alt="hello"/>
                        <h1 >Login Page  </h1>
                    </div>
                        <Input 
                            type="text"
                            id="user_name"
                            name="userName"
                            onChange={this.onChangeWithInputs}
                            value={userName}
                            label="User Name"
                            dataError="Enter a valid User Name"
                            dataSuccess="User Name is valid"
                             />
                        <Input 
                        type="password"
                        id="pass_word"
                        name="passWord"
                        onChange={this.onChangeWithInputs}
                        value={passWord}
                        label="Pass Word"
                            />

                        <div className="login-btn" >
                            <button type="submit" className="btn waves-effect waves-light light-blue darken-2" name="action">Submit
                                <i className="material-icons right">send</i>
                            </button>
                        </div>
                    </form>
                    {this.state.displayError ? <p>User name of password was invalid</p> : null}
                </div>
            </div>
        )
    }
}

export default Login;