import  Mongoose   from "mongoose";

const TeamSchema = Mongoose.Schema({
   TeamName :{
       type: String,
       required: true
   },
   TeamUrl :{
     type :String,
     required : true
   },
   AdminId: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', 
  },
  TeamMembers :[{
    type : Mongoose.Schema.Types.ObjectId,
    ref :'User',
  },
]    
  },
  
{
  timestamps: true,
}
)

const Team = Mongoose.model('Team',TeamSchema)
export default Team;