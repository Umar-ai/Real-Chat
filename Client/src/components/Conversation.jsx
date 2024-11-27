import React, { useEffect, useState, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Contextcreator from '../Context/Context';

function Conversation() {
  const { socketroll, receiverid } = useContext(Contextcreator);
  const { id } = useParams();
  const { handleSubmit, register, reset } = useForm();
  const { sockets } = useContext(Contextcreator);
  const [messages, latestmessage] = useState([]);
  const senderid = useSelector((state) => state.userData._id);
  const [messageresponse, setmessageresponse] = useState([]);
  const [allmessageresponse, setallmessageresponse] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (sockets) {
      sockets.on('message', (response) => {
        latestmessage((prev) => [...prev, response.message]);
        setmessageresponse((prev) => [...prev, response]);
      });
      return () => {
        sockets.off('message');
      };
    }
  }, [sockets]);

  useEffect(() => {
    const getallmessage = async () => {
      const response = await axios.post('http://localhost:8000/api/v1/messages/allmessage');
      console.log(response);
      setallmessageresponse(response.data.data);
    };
    getallmessage();
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messageresponse, allmessageresponse]);

  const sendmsg = (data) => {
    if (sockets && sockets.connected) {
      console.log(data);
      sockets.emit('sendmessage', { message: data.message, receiverSocketid: id, senderSocketid: socketroll, receiverid, senderid });
      reset();
    } else {
      console.log('not connected');
    }
  };

  return (
    <div className="flex flex-col h-screen ">
      <div className="flex-grow overflow-y-auto p-4">
        {/* Render all previous messages */}
        {allmessageresponse?.map((eachmsg, index) => (
          eachmsg.senderid === senderid && eachmsg.receiverid === receiverid || eachmsg.receiverid === senderid && eachmsg.senderid === receiverid ? (
            <div
              key={index}
              className={`max-w-[30%] p-4 rounded-md my-2 break-words ${
                eachmsg.senderid === senderid ? 'ml-auto bg-blue-700 text-white' : 'mr-auto bg-gray-300 text-black'
              }`}
            >
              {eachmsg.message}
            </div>
          ) : null
        ))}

        {/* Render new messages */}
        {messageresponse?.map((eachmsg, index) => (
          <div
            key={index}
            className={`max-w-[30%] p-4 rounded-md my-2 break-words ${
              eachmsg.senderid === senderid ? 'ml-auto bg-blue-700 text-white' : 'mr-auto bg-gray-300 text-black'
            }`}
          >
            {eachmsg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit(sendmsg)} className="flex justify-between p-4 border-t border-gray-500">
        <input
          type="text"
          {...register('message', { required: true })}
          placeholder="Type a message"
          className="flex-grow p-2 border border-blue-900 rounded-md mr-2"
        />
        <button type="submit" className="p-2 bg-blue-700 text-white rounded-md">Submit</button>
      </form>
    </div>
  );
}

export default Conversation;
