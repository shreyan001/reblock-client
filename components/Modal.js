import { HuddleIframe,  huddleIframeApp  } from "@huddle01/huddle01-iframe";
import { useEffect } from "react";
import Draggable from 'react-draggable';



export default function Modal({address,iframeData,isOpen,onClose,name})  {

  if(isOpen===false) {return null} ;
 setTimeout(()=>{huddleIframeApp.methods.connectWallet(address)},8000);       
 let pr;
 setTimeout(()=>{ pr= huddleIframeApp.infoMethods.getParticipants()},22000);
return(<Draggable handle="strong" className="modalh">
<div className="box no-cursor">
<strong><div className="cursor"><button onClick={()=>huddleIframeApp.methods.connectWallet(address)} className="button1">Connect</button>
 <button className="button1" onClick={()=>{onClose(name) }}>Close</button></div></strong>  
  <div className="popMeet"><HuddleIframe config={iframeData} className="huddle" /></div>
</div> 
</Draggable>)






  

}