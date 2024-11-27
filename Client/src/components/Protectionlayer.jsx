import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from 'react'
function Protectionlayer({children}) {
const navigate=useNavigate()
const status=useSelector((state)=>state.status)
const [loader,setloader]=useState(true)
useEffect(()=>{
    if(!status){
        navigate('/login')
    }
    
    setloader(false)
},[status,navigate])





return loader? <div>...loading</div>:<div>{children}</div>

}

export default Protectionlayer
