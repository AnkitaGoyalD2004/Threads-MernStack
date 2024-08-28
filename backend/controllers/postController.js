import Post from "../models/postModel.js";
import User from "../models/userModel.js";

const createPost = async (req, res) => {
	try {
		const { postedBy, text } = req.body;
		let { img } = req.body;

		if (!postedBy || !text) {
			return res.status(400).json({ error: "Postedby and text fields are required" });
		}

		const user = await User.findById(postedBy);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		if (user._id.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to create post" });
		}

		const maxLength = 500;
		if (text.length > maxLength) {
			return res.status(400).json({ error: `Text must be less than ${maxLength} characters` });
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		const newPost = new Post({ postedBy, text, img });
		await newPost.save();

		res.status(201).json(newPost);
	} catch (err) {
		res.status(500).json({ error: err.message });
		console.log(err);
	}
};

const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		res.status(200).json(post);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
 
const deletePost = async(req , res)=>{
 try{
 
    const post = await Post.findById(req.params.id);

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }

    if(post.postedBy.toString() !== req.user._id.toString()){
        return res.status(401).json({message : "Unauthorized to delete post"})
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(500).json({message: "Post Deleted Successfully"})

 }catch(error){
    res.status(500).json({ error: error.message });
 }
}
export { createPost, deletePost, getPost };


