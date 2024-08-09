import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    postedBy:{
        type: mongoose.Schema.Types.ObjectId,
//mongoose.Schema.Types.ObjectId is a special Mongoose SchemaType used for unique identifiers.
//It corresponds to MongoDB's ObjectId type.
//Purpose: This field is typically used to create a reference to another document, usually a user document.
//This structure allows you to associate each post with a user (the one who created the post) by storing the user's ObjectId. 
//It's a common pattern for implementing relationships between documents in MongoDB.
ref:'User',
required: true
    },
    text:{
        type:String,
        maxLength:500
    },
    img:{
        type: String,
    },
    likes:{
        type:Number,
        default:0
    },
    replies:[
        {
            userId:{
                type: mongoose.Schema.Types.ObjectId,
                ref:'User',
                required: true
            },
            text:{
                type:String,
                required: true
            },
            userProfilePic:{
                type:String,
            },
            username:{
                type:String
            }
        }
    ]
},{
    timestamps: true
})

const Post = mongoose.model("Post" , postSchema);

export default Post;