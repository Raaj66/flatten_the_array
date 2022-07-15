const jwt = require('jsonwebtoken');

module.exports = async(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1];
        if(token){
            const decode = jwt.decode(token,'i_am_the_king_of_the_world');
            if(decode){
                next();
            }
        }
    } catch (error) {
        res.status(401).send('Unauthenticate')
    }
}