import jwt from 'jsonwebtoken';
const generateTokenAndSetCookie = (userId , res) =>{
//Here we craete the jwt token
const token = jwt.sign({userId} , process.env.JWT_SECRET , {
    expiresIn: '15d'
})
res.cookie("jwt" , token , {
    httpOnly: true  , // this means that this cookie will not be accessible with js & more secure
    maxAge : 15 * 25 * 60 * 60 * 1000,
    sameSite: "strict",
});
return token;
}

export default generateTokenAndSetCookie;