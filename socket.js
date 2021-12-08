let io ;
import {Server} from 'socket.io'
export default   {
   init : httpServer => {
       io = new Server(httpServer,{
        transports: ['polling'],
           cors:{
               origin: '*',
           }
           
       }) 
       return io
   },
   getIO: () => {
       if(!io){
           return io
       }else{
           throw new Error('erreur socket no initiiazie')
       }
   }
}