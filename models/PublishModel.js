import mongoose from 'mongoose'


const PublishSchema =  mongoose.Schema({
    username: { type: String, required: true },
    Title: { type: String, required: true },
    Description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userImgUrl: { type: String, required: true },
    category: { type: String, required: true },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User', 
      }
    },{timestamps: true,   }

) 


const Publish = mongoose.model("Publish",PublishSchema)

export default Publish