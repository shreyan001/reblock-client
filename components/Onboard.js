import Link from 'next/link';
import { useState,useEffect } from 'react';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './functions/Register';
import CreateMeet from './createMeet';
import { useRouter } from 'next/router';
import Landing from './Landing';
import { useAuth } from '../contexts/AuthContext';


import axios from "axios";





export  default function Login() {
  
 const router = useRouter();
 const {currentUser} = useAuth();
 
  const [code,setCode] = useState();
  const [isMOpen,setMOpen] = useState(false);
  const [id,setid] = useState();
  const [objectName,setObjName]=useState();
  const [meetMod,setMeetMod]= useState(false);

  


const API = process.env.NEXT_PUBLIC_API_URI;

async function handleLogin() {
  const toastId = toast.loading("Loading...");
  try {
    const block = await axios.post(`https://${API}/api/blocks/search/`,{Id:code});
    const blockData = block.data;
    const objName = Object.keys(blockData)[0];
    setObjName(objName);
  
    if (block.status === 292) {
      toast.update(toastId, { render: "Meet not found", type: "error", isLoading: false, autoClose: 5000 });
      return;
    }
  
    if(block.status===200) {
      if(objName && blockData[objName]._id) {
        setid(blockData[objName]._id);
        const response = await axios.post(`https://${API}/api/login`, {address:currentUser?.addr,id:blockData[objName]._id});
  
        if (response.status === 200) {
          toast.update(toastId, { render: "All is good", type: "success", isLoading: false, autoClose: 5000 });
          router.push(`/login/${objName}/${code}`);
        } else if(response.status === 280) {
          toast.update(toastId, { render: "Register", type: "info", isLoading: false, autoClose: 5000 });
          setMOpen(true);
        } else {
          toast.update(toastId, { render: "Block not found", type: "error", isLoading: false, autoClose: 5000 });
        }
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      toast.update(toastId, { render: "Block not found", type: "error", isLoading: false, autoClose: 5000 });
    } else {
      toast.update(toastId, { render: "Failed to load", type: "error", isLoading: false, autoClose: 5000 });
    }
    console.log(error);
  } 
  
  
}


    

const redirect = () => {
   if(!code) {toast.error("please enter your code first")}
    else if(currentUser?.loggedIn && code.length===5){
      handleLogin();
   
    }
    else if (currentUser?.loggedIn && code.length===null){
      toast.error('please enter your code first');
    }
    else if(currentUser?.loggedIn && code.length !==7) {
        toast.error('Meet code must be 5 digits'); 
    }
    else{
        toast.error('Please connect your wallet first');
    }
}
    
    return(  <>
<Register code={code} objectName={objectName} address={currentUser?.addr} isMOpen={isMOpen} id={id} onMClose={()=>{setMOpen(false)}} />
<ToastContainer
transition={Slide}
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
  
<CreateMeet meetMod={meetMod} address={currentUser?.addr} onClose={()=>setMeetMod(false)}/>

 <div className=" relative w-11/12 m-auto bg-black4 rounded-2xl h-fit pb-4" style={{"min-height":"86vh"}}>
    <nav className=" relative flex-col mx-auto justify-between items-center w-11/12 mt-12 mb-8" >

       <div className='flex w-full mx-auto pt-1 flex-row justify-between items-center '>

         <div className=" mx-2 flex flex-row justify-center items-center h-24 w-1/8">
         <div className="h-fit w-fit  border-1 border-solid border-white "><img className=" h-14 w-auto" src='logo2.jpg' alt='logo'/></div>   
            <h1 className=' font-semibold m-0 text-lg pr-3'>BlinkMeet</h1></div>
        <div className="mx-2 flex flex-row justify-center items-center h-24 w-fit">
            <a className='hover:opacity-60 cursor-pointer colorcode font-semibold text-lg px-3'
                onClick={()=>{toast.dark("Coming Soon")}}
                       >Marketplace</a><Landing/></div>
       </div>
    </nav>

    <div className="mt-5 w-9/12 h-42 min-h-fit mx-auto text-center flex flex-col justify-between items-center">
        <h1 className='text-4xl antialiased	 w-7/12 font-bold'>Reinvent Your Virtual Socializing Experience</h1>
        <p className='w-2/3 mt-5 font-semibold text-lg  text-gray-400'>Join the Interactive Revolution and Experience a Whole New Way of Connecting and Networking with Our Platform</p>
     </div>
  
   <div className=" mx-auto mt-2 mb-5 w-1/2 flex flex-row justify-around items-center h-32">
       <div className=" w-2/5  flex flex-col justify-evenly items-start">
         <h1 className='text-semibold m-0 text-xs'>Enter Code or link</h1>
         <div className=' grid-rows-2 my-1.5 w-full h-fit'>
           <input className=' w-32 h-10 bg-black2 text-gray-200 rounded-xl' type ='number' onChange={e => {setCode(e.target.value)}}></input>
           <button className=' button1 h-10 ml-2 text-sm w-20 rounded-xl text-black1 font-semibold' onClick={()=>{redirect();}} >Join</button>
         </div>
         <p className=' text-small text-semibold text-gray-400'>Please enter your Event code given by organizer.</p>
       </div>
        
       <h1 className='text-xl text-semibold text-gray-500'>or</h1> 
       <div role="button" onClick={()=>{setMeetMod(true)}} className=" button-x h-12 w-36 flex justify-center items-center"><h1 className='colorcode font-semibold text-center'>Create Meet</h1></div>        
     </div>
     <div className=" w-1/2 mx-auto my-2 h-fit flex flex-row justify-center items-center">
      </div>
    </div>
    </>
    
    )
};