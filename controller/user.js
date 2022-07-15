const userModel = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const helper = require('../utils/helper');
const addNewUser = async(req,res)=>{
    try {
        const  { name,email,phone, password } = req.body;
        if(name == '' || email == ''  || password =='' ){
            throw new Error('invalid input')
        }
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
              , 'my_secret_key',
               { expiresIn: 60 * 60 });
            
              res.status(200).json({
                token,
              })
           } else{
            res.status(401).send('invalid username password ')
           }

        }).catch(err=>{
            res.status(500).send(err.message);
        })
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const  flattenArray = async(req,res)=>{
    try {
            let emptyArray = []
            const {arr} = req.body;
            const result = await helper.flattenArray(arr,emptyArray);
            res.status(200).json(result)
        } catch (error) {
            res.status(400).send(error.message)
        }
}
module.exports = {
    addNewUser,
    login,
    flattenArray
}