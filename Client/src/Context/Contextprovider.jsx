import { useState } from "react";
import Contextcreator from "./Context";


import React from 'react'

function Contextprovider({children}) {
    const[sockets,setsocket]=useState({})
    const[socketroll,setsocketroll]=useState()
    const[receiverid,setreceiverid]=useState()
  return (
   <Contextcreator.Provider value={{sockets,setsocket,socketroll,setsocketroll,receiverid,setreceiverid}}>
    {children}
   </Contextcreator.Provider>
  )
}

export default Contextprovider
