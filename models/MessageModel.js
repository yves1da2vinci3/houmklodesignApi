import mongoose from 'mongoose'

const MessageSchema = mongoose.Schema({
      senderId: {
          type: mongoose.Schema.Types.ObjectId,
          required :true,
          ref: 'User'
      },
      imgURL: {
        type: String,
        required :true,
    },
   TeamId: {
        type: mongoose.Schema.Types.ObjectId,
        required :true,
        ref: 'Team'
    },
    TextContent :{
        type: String,
        required :true,
    }
})

const Message = mongoose.model('Message',MessageSchema)
export default Message