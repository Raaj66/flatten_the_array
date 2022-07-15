const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const addNewUser = async(req,res)=>{
    try {
        const  { name,email,phone, password } = req.body;
        if(name == '' || email == '' || phone =='' || password =='' ){
            throw new Error('invalid input')
        }
        console.log(name,password,email,phone)
        const hash = bcrypt.hashSync(password, 10);

        const user = new userModel({
            name,
            email,
            phone,
            password:hash
        })
        user.save().then(()=>{
            res.status(201).send('user added')
        }).catch(err=>{
            res.status(500).send(err.message)
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const login = async(req,res)=>{
    try {
        const {email,password}= req.body;
        userModel.findOne({email}).then(async (result)=>{
           const isMatch =  bcrypt.compareSync(password, result.password); 
           if(isMatch){
            const token = jwt.sign(
                {userId:result.id,email:result.email}
              , 'i_am_the_king_of_the_world', { expiresIn: 60 * 60 });
            
              res.status(200).json({
                token
              })
           }else{
            res.status(401).send('invalid username password ')
           }

        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = {
    addNewUser,
    login
}