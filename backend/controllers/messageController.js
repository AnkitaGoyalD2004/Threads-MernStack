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
async function getConversations(req, res) {
	const userId = req.user._id;
	try {
		const conversations = await Conversation.find({ participants: userId }).populate({
			path: "participants",
			select: "username profilePic",
		});

		// remove the current user from the participants array
		conversations.forEach((conversation) => {
			conversation.participants = conversation.participants.filter(
				(participant) => participant._id.toString() !== userId.toString()
			);
		});
		res.status(200).json(conversations);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}
export { getConversations, getMessages, sendMessage };

