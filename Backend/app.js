const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('config');
const dbRoute = config.get('mongoUri');
const User = require('./User');
mongoose.connect(dbRoute, {
    useNewUrlParser: true,
    useCreateIndex: true,
})
.then(()=>{
    console.log('database connected');
    User.save({
        userName: 'faisal',
        password: '12345',
        status: 'admin',
    })
    .then(res=>{
        console.log('res: ', res);
    })
    .catch(err=>{
        console.log('err saving: ', err);
    })
})
.catch((err)=>{
    console.log('error mongo ', err);
})

app.use(cors());


router.get('/getData', (req, res)=>{
    const data = {
        userName: 'faisal',
        passWord: '12345',
        status: 'student',
    }
    return res.json(data);
})
router.post('/getPost', (req, res)=>{
    const data = {
        userName: 'faisal',
        passWord: '12345',
        status: 'student',
    }
    console.log('posting');
    return res.json(data);
})

app.use('/api', router);

app.listen(5000, ()=>{
    console.log('listening on port 5000');
})

console.log('wellcome server');