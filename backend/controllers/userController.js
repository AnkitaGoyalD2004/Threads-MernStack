import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";

//Signup User
const signupUser = async (req, res) => {
  try {
    const { name, email, username, password } = req.body;
    const user = await User.findOne({ $or: [{ email }, { username }] });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    if (newUser) {
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};

//Login User
const loginUser = async (req, res) => {
  try {

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (!user || !isPasswordCorrect) { return res.status(400).json({ message: "Invalid username or password" }); }
    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in login User :", error.message)
  }
}

//Logout User
const logoutUser = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    res.status(200).json({ message: "User logged out successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in login User :", error.message)
  }
}

//Follow Unfollow
const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id) return res.status(400).json({ message: "You cannot Follow/Umfollow yourself" })
      if (!userToModify || !currentUser) return res.status(400).json({ message: "User not found" });

    const isFollowing = currentUser.following.includes(id);
    if(isFollowing){
      //Unfollow User
      // Modify current user following , modify Followers of userToModify 
      await User.findByIdAndUpdate(req.user._id , {$pull : {following : id}});
      await User.findByIdAndUpdate(id , {$pull : {followers : req.user._id}});

      res.status(200).json({message : "User unfollowed successfully"})
    }else{
    // follow user
    await User.findByIdAndUpdate(req.user._id , {$push: {following: id}  });
    await User.findByIdAndUpdate(id , {$push : {followers : req.user._id}});

    res.status(200).json({message : "User followed successfully"})
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log("Error in FollowUnfollowUser :", error.message)
  }
}

export { followUnFollowUser, loginUser, logoutUser, signupUser };

