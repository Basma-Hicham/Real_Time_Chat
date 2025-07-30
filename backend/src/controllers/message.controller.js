import User from "../models/user.model.js"
import Message from "../models/message.model.js"


export const getUsersForSidebar = async (req , res)=> {
 //GET ALL USERS EXCEPT OURSELVES
try{
    const loggedInUser = req.user._id
    const filteredUsers = await User.find({_id : {$ne: loggedInUser}}).select("-password")    
    res.status(200).json(filteredUsers)
}catch(err){
   res.status(500).json({message:"Internal server error"})
}
}

export const getMessages =async (req , res)=>{
    //get messages with another user in chronological order (بنفس الترتيب الزمني)
try {
    const {id: userToChatId} = req.params //Unstructured the id from req parameters ,, then renamed it
    const myId = req.user._id
    const chat = await Message.find({
        //find messages either from sender or from receiver
        //sender can be a receiver 
        $or:[
            {senderId: myId , receiverId: userToChatId},
            {senderId:userToChatId , receiverId:myId}
        ]
    })
    res.status(200).json({chat})
} catch (error) {
       res.status(500).json({message:"Internal server error"})
 
}    
}
export const sendMessage = async (req,res)=>{
    try {
    const {text, image} = req.body
    const { id: receiverId} = req.params  
    const senderId= req.user._id
    let imageUrl
    if(image){
        // me7tageen cloudnary ab2a azbat elmwdo3 dh
        console.log("there's an image")
    }
    //posting a new document in db "sending a message"

    const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image
    }) 
    
    await newMessage.save()
    //toDo : realtime functionality goes here with (socket.io)
   res.status(201).json({newMessage})
    } catch (error) {
        console.log("error in sendMessage controller", error.message)
       res.status(500).json({message:"Internal server error"})
 
    }
}