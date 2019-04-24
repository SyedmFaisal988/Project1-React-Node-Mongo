const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('config');
const dbRoute = config.get('mongoUri');
const User = require('./models/User');
mongoose.connect(dbRoute, {
    useNewUrlParser: true,
    useCreateIndex: true,
})
.then(()=>{
    console.log('database connected');
    // let newUser = new User({
    //     userName: 'faisal',
    //     password: '12345',
    //     status: 'admin',
    // })S
    // newUser.save();
    // User.deleteOne({userName: "admin"})
    // .then(resp=>{
    //     console.log("deleted");        
    // })
    // .catch(err=>{
    //     console.log("error deleting");
    // })
})
.catch((err)=>{
    console.log('error mongo ', err);
})

app.use(cors());
app.use(express.json());

router.post('/validUser', (req, res)=>{
    console.log(req.body);
    User.findOne({userName: req.body.userName, password: req.body.passWord})
    .then(response=>{
        console.log('getData')
        return res.json({"status": response.status })
    })
    .catch(err=>{
        return res.json({"status": "null"})
    })
})

router.get('/getData', (req, res)=>{
    User.find()
    .then(response=>{
        console.log('response: ', response);
        return res.json(response);  
    })
    .catch(err=>{
        return res.json({"err": err});
    })
})

router.post('/updateUser', (req, res)=>{
    console.log(" to be updated",req.body);
    User.findOneAndUpdate({userName: req.body.userName}, {$set: { "status": req.body.status}}, {new: true})
    .then((response)=>{ 
        console.log("updated user", response);
        return res.json(response);
    })
    .catch(err=>{
        console.log('update error', err);
        return res.json({"err": err});
    })
})

router.post('/addUser', (req, res)=>{
    const { userName, passWord} = req.body;
    let newUser = new User({
            userName,
            password: passWord,
            status: '',
        })
        newUser.save()
        .then(response=>{
            console.log('user adderd: ', response);
            return res.json(response);
        })
        .catch(err=>{
            console.log('err saving: ', err);
            return res.json({"true": true});
        })
})

app.use('/api', router);

app.listen(5000, ()=>{
    console.log('listening on port 5000');
})

console.log('wellcome server');