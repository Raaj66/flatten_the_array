const jwt = require('jsonwebtoken');

module.exports = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(token){
            const decode = jwt.decode(token,'my_secret_key');
            if(decode){
                next();
            }
        }
    } catch (error) {
        res.status(401).send('Unauthenticate')
    }
}