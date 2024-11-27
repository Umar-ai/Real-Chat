import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Contextcreator from '../Context/Context'
function Allid() {
  const [alldata, setalldata] = useState([])
  const{setsocketroll,setreceiverid}=useContext(Contextcreator)
  const data = useSelector((state) => state.status)
  const userid = useSelector((state) => state.userData._id)
  const navigate = useNavigate()
  const currData = useSelector((state) => state.userData)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/v1/users/Allusers')
        setalldata(response.data.data)

      } catch (error) {
        console.log("Error occured while fetching data")
      }
    }
    fetchdata()

  }
    , [data])

  useEffect(() => {
    alldata.map((eachData) => {
      if (eachData._id == userid) {
        
        setsocketroll(eachData.socketid)
      }
    })
  }, [alldata,userid])


  const onClickF = (data) => {
    if (data.socketid != null) {
      navigate(`/gupshup/${data.socketid}`)
      setreceiverid(data._id)
      console.log(data._id)
    }
    else {
      console.log("user not logged in ")
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Online Users</h2>
      <ul className="space-y-3">
        {alldata?.map((userData) => (
          userData.username !== currData.username && ( // Conditional rendering for entire <li>
            <li key={userData._id} className="flex items-center space-x-4 p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
              
              <div className="flex-1">
                <span className="text-lg font-semibold">{userData.username}</span>
              </div>
              <button
                onClick={() => onClickF(userData)}
                className={`py-1 px-4 rounded-lg text-sm font-medium transition ${userData.socketid != null ? 'bg-green-500 text-white' : 'bg-red-600 text-white'}`}
              >
                {userData.socketid != null ? 'Online' : 'Offline'}
              </button>
            </li>
          )
        ))}
      </ul>
    </div>
  );``
}

export default Allid
// in this i will find all userdata and display their username and their socket ids.