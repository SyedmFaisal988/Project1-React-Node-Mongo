const express = require('express');
const app = express();
const router = express.Router();

router.get('/getData', (req, res)=>{
    const data = {
        userName: 'faisal',
        passWord: '12345',
        status: 'student',
    }
    return res.json(data);
})

app.use('/api', router);

app.listen(5000, ()=>{
    console.log('listening on port 5000');
})

console.log('wellcome server');