import { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {initializesocket} from './Socket'
import useSocketVisibility from './VisibilityHook'
import { useContext } from 'react'
import Contextcreator from '../Context/Context'
import { useNavigate } from 'react-router-dom'



 function Chat() {
const navigate=useNavigate()
  const{setsocket}=useContext(Contextcreator)
  const userData=useSelector((state)=>state.userData)
  const [messages, setmessages] = useState([])

useEffect( ()=>{
 const initialzeSSocket=async()=>{
  if(userData)
    {
         const socket=await initializesocket(userData)
         if(socket){
          setsocket(socket)
          
         }
          socket.on('message', (latestmsg) => {
            console.log(latestmsg)
            setmessages((prev) => [...prev, latestmsg])
          })
    
          
    
        
          return () => {
            socket.off('connect');
          socket.off('message');
          socket.off('disconnect')
          socket.close();
        }}
 }
 initialzeSSocket()
},[userData])
 useSocketVisibility(initializesocket())

 
 
 

 return (
  <>
    <div className="flex flex-col items-center justify-center h-screen bg-blue-900 text-white">
      <h1 className="text-5xl font-bold mb-6">Chat App</h1>
      <button onClick={()=>navigate('/all')} className="py-2 px-4 bg-white text-blue-900 font-semibold rounded-md hover:bg-blue-800 hover:text-white transition duration-300">
        Start a Chat
      </button>
    </div>
  </>
);


}

export default Chat
