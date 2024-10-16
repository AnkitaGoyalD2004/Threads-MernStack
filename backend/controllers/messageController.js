import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

async function sendMessage(req, res) {
    try {
        const { recipientId, message } = req.body;
        const senderId = req.user._id;

        // Find conversation between sender and recipient
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, recipientId] },
        });

        // If no conversation exists, create a new one
        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: {
                    text: message,
                    sender: senderId,
                },
            });
            await conversation.save();
        }

        // Create a new message
        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
        });

        // Update lastMessage field in the conversation document
        await Promise.all([
            newMessage.save(),
            Conversation.findOneAndUpdate(
                { _id: conversation._id },
                {
                    lastMessage: {
                        text: message,
                        sender: senderId,
                    },
                }
            ),
        ]);

        res.status(200).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getMessages(req, res) {
    const { otherUserId } = req.params;
    const userId = req.user._id;
    try {

        const conversation = await Conversation.findOne({
            participants: { $all: [userId, otherUserId] }
        })

if(!conversation){return res.status(404) . json({error : "Conversation not found"})}

        const messages = await Message.find({
            conversationId: conversation._id
        }).sort({ createdAt: 1 })
        res.status(200).json(messages);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
// async function getConversations (req , res){
//     const userId  = req.user._id;
//     try{
//   const conversations = await Conversation.find({participants : userId}).populate({
//     path: "participants",
//     select: "username profilePic",
//   })
//   res.status(200).json(conversations);
//     }catch(error){
//         res.status(500).json({ error: error.message });

//     }
// }


async function getConversations(req, res) {
  try {
    // Check if req.user exists and contains _id
    if (!req.user || !req.user._id) {
      return res.status(400).json({ error: "User not authenticated" });
    }

    const userId = req.user._id;

    // Ensure userId is an ObjectId
    const objectIdUserId = mongoose.Types.ObjectId(userId);

    // Fetch conversations with participants populated
    const conversations = await Conversation.find({
      participants: objectIdUserId, // Make sure it's ObjectId
    }).populate({
      path: "participants",
      select: "username profilePic",
    });

    // Check if conversations exist
    if (!conversations || conversations.length === 0) {
      return res.status(404).json({ message: "No conversations found" });
    }

    // Respond with conversations
    res.status(200).json(conversations);
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: error.message });
  }
}

  
export { getConversations, getMessages, sendMessage };

