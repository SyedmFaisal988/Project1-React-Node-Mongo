import React, {Component} from 'react';
import Axios from 'axios';
import './Admin.css';

class Admin extends Component{
    state={
        userList: [],
    }
    componentDidMount() {
        Axios.get('http://localhost:5000/api/getData')
        .then(res=>{
            console.log('cdm he', res);
            this.setState({
                userList: res.data
            })
        })
        .catch(err=>{
            console.log('error retriving: ', err);
        })
    }
    onChangeText = (event, index)=>{
        const { userList } = this.state;
        userList[index].status = event.target.value; 
        this.setState({
            userList,
        })
    }
    updateStatus = ( index)=>{
        const user = this.state.userList[index];
        Axios.post('http://localhost:5000/api/updateUser', {
            userName: user.userName,
            status: user.status,
        })
        .then(res=>{
            console.log('update respone', res);
            let { userList } = this.state;
            userList = res.data;
            try{
                if(userList[0]!== undefined)
                this.setState({
                    userList,
                })
            }
            catch(err){

            }
        })
    }
    render(){
        return(
            <div className="admin-header">
                <div className="admin-wrapper z-depth-5">
                    <h1>Welcome to Admin Panel</h1>
                    {
                        this.state.userList.map((user, index)=>
                            <div key={user._id} className="user-detail">
                                <p>User Name: {user.userName} Status: <div style={{width:'25%',}} className="input-field inline">
                                    <input id="status" type="text" value={user.status} onChange={(event)=>this.onChangeText(event, index)} style={{fontSize: "30px",}} />
                                    </div >
                                    <a style={{ float: 'right', marginTop: '30px', marginRight: '10px'}} className="waves-effect waves-light btn" onClick={()=>this.updateStatus(index)}>Update</a>
                                    <a style={{float: 'right', marginTop: '30px', marginLeft: '20px', marginRight: '5px'}} className="waves-effect waves-light btn">Delete</a>
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Admin; 