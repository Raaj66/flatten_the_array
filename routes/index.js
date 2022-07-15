const express = require('express');
const router = express.Router();
const users = require('../controller/user');
const authCheck = require('../utils/middleware');
router.post('/user',users.addNewUser);
router.post('/login',users.login);
router.get('/',authCheck,(req,res)=>{
    res.send('okay')
})

module.exports = router;