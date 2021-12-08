import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'
import Io from './socket.js'
let app = express()
const PORT = process.env.PORT || 5000;
const server = http.createServer(app)
// const io = new Server(server,
//   {
//     transports: ['polling'],
//     cors:{
//       origin: 'http://localhost:3000'
//     }
//   }
//   )


const io = Io.init(server)
  // deifition du like handler

  // verifie si le mec existe ,si oui retourne un tableau ou tul'enleves lui sinon mets le a l'interieur


// importation des routes
import UserRoutes from './routes/userRoutes.js';
import ArticlesRoutes from './routes/articlesRoutes.js'
import teamRoutes from './routes/teamRoutes.js'


// connection a la  db
dotenv.config()
const connectToMongo = async() => {
  await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  });
  return mongoose;
};
await connectToMongo().then(async() => console.log('connected TO MONGO DataBase'));
// apply des mmiddlewares
app.use(cors({origin:"*"}))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// real time thing
io.on('connection',(socket)=>{
  console.log(`socket ${socket.id} is connected`)
})
// Routage 


app.get('/',(req,res)=>{
  res.send("yo it is just a test")

})


app.use('/api/users',UserRoutes)
app.use('/api/articles',ArticlesRoutes)
app.use('/api/team',teamRoutes)

server.listen(PORT,(req,res) => {
    console.log('running on')
})
