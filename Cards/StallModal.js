import axios from "axios";
import { useState,useEffect } from "react";


   

  export default function StallModal({ name, stallModal,OId, onClose,onOpen}) {
    const [data, setdata] = useState(null);
    const API = process.env.NEXT_PUBLIC_API_URI;
    useEffect(() => {
      async function fetchdata() {
        try {
          const { data } = await axios.get(
            `https://${API}/api/stalls/modal/${name}/?_id=${OId}`
          );
          setdata(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
  
 if(OId) {fetchdata();}
    }, [name,OId]);
  
    if (stallModal === false || !data) {
      return null;
    }
 
return(<div className=" h-1/2 w-1/2 m-auto p-6 bg-black2 rounded-lg flex flex-col items-center justify-start
overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
 <div className="w-11/12 mb-3 h-fit"><img className="h-6 w-auto float-right" onClick={onClose} src="modalcross.svg" alt="modalcross" /></div>
 <div className="flex flex-row items-center w-11/12 justify-around">
  <div className="w-2/5 h-fit flex flex-col gap-2 items-start justify-around">
    <div className="w-11/12 h-fit flex flex-row justify-start gap-1.5 items-center"><img className="h-10 w-auto" src={data.logoImage} alt="logoImage" />
    <h1 className="text-2xl font-bold">{data.title}</h1></div>
    <p className="w-11/12 h-fit text-sm">{data.description} </p>
    <a className="text-xs mt-1 underline" target="_blank" href={data.website}>{data.title}-&nbsp;{data.website}</a>
    <div className="w-7/12 mb-2 flex flex-row items-start justify-between h-fit">
       <a href={data.twitter} target="_blank"><img className="h-8 w-auto" src="twitter.png" alt="twitter"/></a>  
     <a href={data.discord} target="_blank"><img className="h-8 w-auto" src="discord.png" alt="discord"/></a> 
    <a href={data.github} target="_blank"><img className="h-8 w-auto" src= "github.png" alt="github"/></a>  </div>
      <div className="w-11/12 flex flex-row items-center justify-start gap-3 h-fit">

      <a href={data.github} target="_blank"><div onClick={data.mintNFT} role="button"className=" button-x rounded-lg h-10 w-24 flex justify-between items-center text-center">
        <h1 className='colorcode font-semibold text-sm mx-auto'>Mint NFT</h1></div> </a>

       <button className="button1 w-24 h-10 text-sm" onClick={()=>{onOpen(name)}}>Join Meet</button></div> </div>
  
  <div className="w-3/5 h-fit"><div className="rounded-lg bg-gray-300 h-60"></div>
</div>
  </div>

</div>);
}