import User from '../models/userModel.js';

const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;

        if (!postedBy || text) {
            return res.status(400).json({ message: "postedBy and text fields are required" });
        }

        const user = await User.findById(postedBy);
        if(!user){
            return res.status(404).json({message: "User not found"});

        }
        if(user._id.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Unauthorized to create post"});
        }

        const maxLength  = 500;
        if(text.length > maxLength){
            return res.status(404).json({message: `Text must be less than ${maxLength} characters`}); 
        }

       const newPost = new Post({postedBy , text , img})

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}
export default { createPost };