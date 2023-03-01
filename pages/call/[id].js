import { useEffect, useState } from "react";
import Modal from  '../../components/Modal'
import Table from "../../Cards/Table2";
import { Player } from "@livepeer/react";
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Landing from "../../components/Landing";
import Image from "next/image";




 export default function Calls() {
  const router = useRouter();
  const [isOwner,setIsOwner] = useState(false);
  const [isOpen,setOpen] = useState(false);
 const {currentUser} = useAuth();
  const [isdata, setIsData] = useState([]);
 const [callName,setcallName] = useState();
 const [name,setName] = useState([]);
 const [ObjId, setObjId]= useState(null);
 const [logo, setLogo]= useState([]);
   
 const useraddress = currentUser?.addr;

   const API = process.env.NEXT_PUBLIC_API_URI;


   const handleDelete = async(name1) => {
    try {
      const response = await axios.delete(
        `https://${API}/api/tables/${name1}/`,
        { data: { addr: useraddress, _id: ObjId } }
      );
  
      if (response.status === 204 || response.status === 200) {
        setOpen(false);     
      } else {
        console.log("Failed to delete address");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const runcall = (name) => {
    if(isOpen === true) {
      toast.error("Please close your existing call first");
    }
    setOpen(true);
    setcallName(name);
  };


  
  const tableRender = async (name)=>{
   
    const toastId  = toast.loading("Loading...");
    const addr = useraddress;
      const response = await axios.put(`https://${API}/api/tables/${name}`, {addr,_id:ObjId});
    if (response.status === 200) {
      runcall(name);
      toast.update(toastId, { render: "Joined", type: "success", isLoading: false, autoClose: 5000})
      
     ;
    } else {
      toast.update(toastId, { render: "Some error occured", type: "error", isLoading: false, autoClose: 5000 })
      
    };

  }

  



 useEffect(() => {
  const fetchData = async () => {
    try {
      const { id } = router.query;
      if (id) {
        const { data: callData } = await axios.post(`https://${API}/api/calls/get`, { callId: id });
        console.log(callData);
        if(callData.Owner === useraddress){setIsOwner(true)}
        setName(callData.userDoc.callName);
        setObjId(callData.userDoc._id);
        setLogo(callData.userDoc.callLogo);
      }
      if (ObjId !== null) {
        const { data: userData } = await axios.get(`https://${API}/api/tables/?_id=${ObjId}`);
        setIsData(userData.userDoc);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching data');
    }
  };
  fetchData();
}, [router.query, ObjId]);

 
 
 
  return (
 <>
    
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
{console.log(ObjId)}

<Modal className="mod1" iframeData={ {
    roomUrl: `http://iframe.huddle01.com/${callName+useraddress}`,
    width: "100%",
    height: "97%",
    noBorder: true,
  }} useraddress="useraddress" isOpen={isOpen} name={callName} onClose={(name)=>{handleDelete(name)}}key={1}/>
    <div className="stream">
    <div className="btn1 overflow-hidden"><img className="pb-3" src={logo} width={500} height={500} alt="V"/></div>
    <div className="miniNav"> <h1>{name}
         </h1> 
    </div><div className="unit"><Landing/></div>
    <button className="button3 bg-red-600">Leave Meet</button>
  </div>
   
  <div className="sec2 my-5">

 <div className="streamb">
  <h1 className="text-xl font-semibold ml-3 mb-2">Main Event</h1><Player
      title="stream"
      playbackId="8dd55f8l5jsiyhd8"
      showPipButton
      objectFit="cover"
      priority
    /></div> 
<img className="w-3/12 mt-7 h-auto" src="/div.svg"alt="V"/>
  </div>
  <div className="w-9/12 mx-auto rounded-2xl bg-black2 flex min-h-60 flex-col justify-center items-center gap-y-5 my-10 py-5">
    <h1 className="font-semibold text-2xl left-2 ml-7">Networking Slots</h1>
    <div className="flex flex-row w-9/12 gap-y-2 justify-between items-center flex-wrap">
    {isdata.map((e,index)=>{
        return <Table tableName={e.tableName} OId={ObjId} key={index} onOpen={(name)=>{tableRender(name)}} />
      })}</div></div>
 <div className="dock">
      {/* Add your dock items here */}
      <Image src="/Modal.png" width="400" height="80" alt="V"/>
      
      {/* Add more dock items here */}
    </div>  
     
 

       
</>);
}

