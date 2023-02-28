import React from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Onboard() {
  const [code,setCode] = useState();

  return (
    <div className='flex flex-row gap-5 justify-center'>
      
   <input className=' w-32 h-10 bg-black2 text-gray-200 rounded-xl' type ='number' onChange={e => {setCode(e.target.value)}}></input>
           <button className=' button1 h-10 ml-2 text-sm w-20 rounded-xl text-black1 font-semibold' >Join</button>
     <button>CreateMeet</button>
    </div>
  )
}
