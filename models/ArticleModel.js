import mongoose from 'mongoose';
const commentSchema = mongoose.Schema(
  {
    Username: { type: String, required: true },
    photoUrl: { type: String, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)
const ArticleSchema = new mongoose.Schema({
  writter : {
    type: String,
    required: true,
  },
  userImgUrl:{
    type: String,
    required: true,
  },
  Title : {
    type: String,
    required: true,
  },
  CoverImage:{
    type: String,
    required: true,
  },
  Description : {
    type: String,
    required: true,
  },
  ArticleContent: Object,
  comments: [ commentSchema ],
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', 
  },
  publishedDate: {
    type:String,
  },
  numComments: {
    type: Number,
    required: true,
    default: 0,
  },
  numLikes: {
    type: Number,
    required: true,
    default: 0,
  },
  LikeUserIds: [Number]
  
})


const  Article =  mongoose.model("Article", ArticleSchema);
export default  Article

