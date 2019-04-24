import React, {Component} from 'react';

class Admin extends Component{
    state={
        userList: [],
    }
    render(){
        return(
            <div>
                <h1>Hello .comWorld from Admin</h1>
                {
                    this.state.userList.map(user=>
                        <h3>user.userName</h3>
                    )
                }
            </div>
        )
    }
}

export default Admin; 