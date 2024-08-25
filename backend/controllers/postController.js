import User from '../models/userModel.js';

const createPost = async (req, res) => {
    try {
        const { postedBy, text, img } = req.body;

        if (!postedBy || text) {
            return res.status(400).json({ message: "please fill all the fields" });
        }

        const user = await User.findById(postedBy);

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
}
export default { createPost };