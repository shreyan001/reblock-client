import { useEffect, useState } from "react";
import Modal from  '../../components/Modal'
import Stall from "../../Cards/Stall";
import Table from "../../Cards/Table";
import Drooms from "../../Cards/Drooms";
import { Player } from "@livepeer/react";
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import StallModal from "../../Cards/StallModal";
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Landing from "../../components/Landing";





 function Meets() {
  const router = useRouter();
  const [isOwner,setIsOwner] = useState(false);
  const [isOpen,setOpen] = useState(false);
  const [isOpen2,setOpen2] = useState(false);
 const {currentUser} = useAuth();
  const [isdata, setIsData] = useState([]);
  const [ channel, setChannel] = useState([]);
  const [stalls , setStalls] = useState([]);
 const [meetName,setMeetName] = useState();
 const [stallModal,setstallModal] = useState(false);
 const [stallModalName,setstallModalName] = useState([]);
 const [name,setName] = useState([]);
 const [ObjId, setObjId]= useState(null);
 const [logo, setLogo]= useState([]);
   
 const useraddress = currentUser?.addr;
  console.log(useraddress);
   const API = process.env.NEXT_PUBLIC_API_URI;


   const handleDelete = async(name1) => {
    try {
      const response = await axios.delete(
        `http://${API}/api/tables/${name1}/`,
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

  
  const handleDelete2 = async(name1) => {
 
    try {
      const response = await axios.delete(
        `http://${API}/api/stalls/${name1}/`,
        { data: { addr: useraddress, _id: ObjId } }
      );
  
      if (response.status === 204 || response.status === 200) {
        setOpen2(false);     
      } else {
        console.log("Failed to delete address");
      }
    } catch (error) {
      console.log(error);
    }
    };

  

  const runMeet = (name) => {
    if(isOpen === true) {
      toast.error("Please close your existing meet first");
    }
    setOpen(true);
    setMeetName(name);
  };

  const runMeet2 = (name) => {
    if(isOpen === true) {
      toast.error("Please close your existing meet first");
    }
    setOpen2(true);
    setMeetName(name);
    setstallModal(false);
  };


  const runModal = (name) => {
    if(stallModal === true) {
      toast.error("Please close your existing meet first");
    }
    setstallModal(true);
    setstallModalName(name);
  };

  
  const tableRender = async (name)=>{
   
    const toastId  = toast.loading("Loading...");
    const addr = useraddress;
      const response = await axios.put(`http://${API}/api/tables/${name}`, {addr,_id:ObjId});
    if (response.status === 200) {
      runMeet(name);
      toast.update(toastId, { render: "Joined", type: "success", isLoading: false, autoClose: 5000})
      
     ;
    } else {
      toast.update(toastId, { render: "Some error occured", type: "error", isLoading: false, autoClose: 5000 })
      
    };

  }

  const tableRender2 = async (name)=>{
   
    const toastId  = toast.loading("Loading...");
    const addr = useraddress;
      const response = await axios.put(`http://${API}/api/stalls/${name}`, 
       {addr,_id:ObjId}
      
      );
    if (response.status === 200) {
      runMeet2(name);
      toast.update(toastId, { render: "Joined", type: "success", isLoading: false, autoClose: 5000})
      
     ;
    } else {
      toast.update(toastId, { render: "Some error occured", type: "error", isLoading: false, autoClose: 5000 })
      
    };

  }



 const channelToast = ()=> {
   toast.success("channels will be implemented soon");
 }
 useEffect(() => {
  const fetchData = async () => {
    try {
      const { id } = router.query;
      if (id) {
        const { data: meetData } = await axios.post(`http://${API}/api/meets/get`, { meetId: id });
        console.log(meetData);
        if(meetData.Owner === useraddress){setIsOwner(true)}
        setName(meetData.userDoc.meetName);
        setObjId(meetData.userDoc._id);
        setLogo(meetData.userDoc.meetLogo);
      }
      if (ObjId !== null) {
        const { data: userData } = await axios.get(`http://${API}/api/tables/?_id=${ObjId}`);
        setIsData(userData.userDoc);

        const { data: channelsData } = await axios.get(`http://${API}/api/channels/?_id=${ObjId}`);
        setChannel(channelsData.userDoc);

        const { data: stallsData } = await axios.get(`http://${API}/api/stalls/?_id=${ObjId}`);
        setStalls(stallsData.userDoc);
        console.log(stallsData.userDoc);
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
<StallModal stallModal={stallModal} OId={ObjId} name={stallModalName} onOpen={(name)=>tableRender2(name)} onClose={()=>{setstallModal(false)}}/>
<Modal className="mod1" iframeData={ {
    roomUrl: `http://iframe.huddle01.com/${meetName+useraddress}`,
    width: "100%",
    height: "97%",
    noBorder: true,
  }} useraddress="useraddress" isOpen={isOpen} name={meetName} onClose={(name)=>{handleDelete(name)}}key={1}/>

<Modal className="mod1" iframeData={ {
    roomUrl: `http://iframe.huddle01.com/${meetName+useraddress}`,
    width: "100%",
    height: "97%",
    noBorder: true,
  }} useraddress="useraddress" isOpen={isOpen2} name={meetName} onClose={(name)=>{handleDelete2(name)}} key={2}/>

    <div className="stream">
    <div className="btn1 overflow-hidden"><img className="pb-3" src={logo} alt="V"/></div>
    
    <div className="miniNav"> <h1>{name}
         </h1> <Landing/>
    </div>
  </div>
   
  <div className="sec2 my-5">

 <div className="streamb"><Player
      title="stream"
      playbackId="8dd55f8l5jsiyhd8"
      
      showPipButton
      objectFit="cover"
      priority
    /><img className="h-2/3 w-auto" src="div.svg" alt="V"/></div> 

  </div>
 
 
  
 <div className="w-11/12 min-h-fit flex flex-row justify-around items-start my-12 mx-auto">
    <div className="w-3/12 rounded-2xl bg-black2 flex min-h-60 flex-col justify-between gap-y-5 py-5">
      <h1 className="font-semibold text-2xl left-2 ml-7">Stalls</h1>
      {stalls.map((e)=>{
        return <Stall title={e.titleName} OId={ObjId} stallName={e.stallName} host={e.host} onOpen={(name)=>{runModal(name);}} key={e._id}/>
      })}
    {isOwner &&  <img className="w-1/3 h-auto mx-auto" src="" alt="V"/>}
      
    </div>
      
     
 
    <div className="w-3/12 rounded-2xl bg-black2 flex min-h-60 flex-col justify-between gap-y-5 py-5">
    <h1 className="font-semibold text-2xl left-2 ml-7">Tables</h1>
    {isdata.map((e,index)=>{
        return <Table tableName={e.tableName} OId={ObjId} key={index} onOpen={(name)=>{tableRender(name)}} />
      })}</div> 
    <div className="w-1/3 rounded-2xl bg-black2 flex min-h-60 flex-col justify-between gap-y-5 py-5">
      <h1 className="font-semibold text-2xl left-2 ml-7">Discussion Rooms</h1>
      {channel.map((e)=>{
        return <Drooms channelName={e.channelName} OId={ObjId} topicName={e.topicName}  onOpen={()=>channelToast()} key={e._id}/>
      })}
      </div>
    </div>   
 
      
       
  </>);
}

export default Meets;