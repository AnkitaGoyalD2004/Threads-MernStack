const  signupUser = async (req , res) =>{
   try{
    const {name , email , username , password} = req.body;
    const user = await UserActivation.findOne({$or:[{email} , {username}]});

   }catch(err){
    res.status(500).json({message : err.message});
    console.log(err.message)
   }
}
export { signupUser };
