import { useEffect, useState } from "react";
import Modal from  '../../components/Modal'
import Table from "../../Cards/Table3";
import axios from 'axios';
import { ToastContainer, toast, Slide } from 'react-toastify';
import { useRouter } from "next/router";
import { useAuth } from "../../contexts/AuthContext";
import Landing from "../../components/Landing";
import Image from 'next/image'




 function Meets() {
  const router = useRouter();
  const [isOwner,setIsOwner] = useState(false);
  const [isOpen,setOpen] = useState(false);
  const {currentUser} = useAuth();
  const [isdata, setIsData] = useState([]);
  const [meetName,setMeetName] = useState();
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

  

  const runMeet = (name) => {
    if(isOpen === true) {
      toast.error("Please close your existing meet first");
    }
    setOpen(true);
    setMeetName(name);
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


 useEffect(() => {
  const fetchData = async () => {
    try {
      const { id } = router.query;
      if (id) {
        const { data: meetData } = await axios.post(`http://${API}/api/floors/get`, { floorId: id });
        console.log(meetData);
        if(meetData.Owner === useraddress){setIsOwner(true)}
        setName(meetData.userDoc.floorName);
        setObjId(meetData.userDoc._id);
        setLogo(meetData.userDoc.floorLogo);
      }
      if (ObjId !== null) {
        const { data: userData } = await axios.get(`http://${API}/api/tables/?_id=${ObjId}`);
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
    roomUrl: `http://iframe.huddle01.com/${meetName+useraddress}`,
    width: "100%",
    height: "97%",
    noBorder: true,
  }} useraddress="useraddress" isOpen={isOpen} name={meetName} onClose={(name)=>{handleDelete(name)}}key={1}/>
    <div className="flex flex-row w-10/12 h-fit mt-14 gap-3 mx-auto justify-around bg-[#0D0D0D] rounded-lg p-8 align-top">
        <Image src="/Group 70.svg" height="600" width="300"/>
     <div className="flex flex-col w-3/4 gap-4 h-fit">
    <div className="flex flex-row justify-around ">
    <div className="btn1 overflow-hidden"><img className="pb-3" src={logo} width={500} height={500} alt="V"/></div>
    <div className="h-20 w-3/4 flex flex-row justify-between pr-8 font-extrabold items-center text-sm"> <h1 className="text-3xl">{name}
         </h1> <Landing/>
    </div>
  </div>
     
      <div className="w-2/5 rounded-2xlflex min-h-60 flex-col justify-between gap-y-5 py-5">
    <h1 className="font-semibold text-2xl left-2 ml-7">Tables</h1>
    {isdata.map((e,index)=>{
        return <Table tableName={e.tableName} OId={ObjId} key={index} onOpen={(name)=>{tableRender(name)}} />
      })}</div></div>     
 </div>
      <div className="dock">
      {/* Add your dock items here */}
      <div className="dock-item">
        <img src="/twitter.png" alt="twitter" />
      </div>
      <div className="dock-item">
        <img src="/twitter.png" alt="/twitter.png" />
      </div>
      <div className="dock-item">
        <img src="/twitter.png" alt="/twitter.pngś" />
      </div>
      {/* Add more dock items here */}
    </div>  
   
 

       
  </>);
}

export default Meets;