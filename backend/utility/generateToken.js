const jwt = require("jsonwebtoken")
const generateToken = (user)=>{
    return jwt.sign({id:user._id,role:user.role},process.env.SECRET_KEY,{expiresIn:'2d'})
}
module.exports = {generateToken};