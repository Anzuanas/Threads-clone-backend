
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

async function sendMessage(req,res) {
    try {
        const {recepientId,message} = req.body;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,recepientId]},
        })
        if(!conversation){
            conversation = new Conversation({
                participants:[senderId,recepientId],
                lastMessage:{
                    text:message,
                    sender:senderId,
                }
            })
            await conversation.save();
        }
        const newMessage =new Message({
         conversationId:conversation._id,
         sender:senderId,
         text:message
        })

        await Promise.all(
            [
                newMessage.save(),
                conversation.updateOne({
                    lastMessage:{
                        text:message,
                        sender:senderId,
                    }
                })
            ]
        )
        res.status(201).json(newMessage)
    } catch (error) {
        res.status(500).json({error:error.meassage})
    }
}
export {sendMessage}