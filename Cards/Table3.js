import { useState,useEffect} from 'react';
import axios from 'axios';
export default function Table({onOpen,tableName,OId}){
   const API = process.env.NEXT_PUBLIC_API_URI;
    const [isdata, setData] = useState([]); 
    
    let x = 8 - isdata.length;
 
    const synx2 = async(name) => {
      const {data} = await axios.get(`https://${API}/api/tables/${name}/?_id=${OId}`) 
      console.log(data, name)
      let data2 = data;
     if (data2) {
       
    const {data} = await axios.post(`https://${API}/api/users`, {addr:data2,_id:OId} )
    console.log(data,name);
    setData(data);
    }};

    useEffect(() => {
      synx2(tableName); 
  }, []);

 useEffect(() => {
    const intervalId = setInterval(() => {
    synx2(tableName); 

    }, 10000);

    return () => clearInterval(intervalId);
  }, [isdata]);

const items = new Array(x).fill(null);


    return (
               
      <div className='w-11/12 h-28 items-center gap-4 flex flex-wrap '>
         {isdata.map((i)=>{return <div className="w-1/5 mx-1 h-fit flex flex-col items-center">
               <div className="w-1/5 h-fit flex flex-col overflow-hidden rounded-sm"><img src={ i.image} alt={i.name}/></div> 
                <div className="font-semibold text-xs">{i.name}</div>
            </div>})}
            {items.map((_, idx) => <div key={idx} onClick={()=>{onOpen(tableName),synx2(tableName)}} className= "h-fit cursor-pointer">
  <div className="bg-black4 flex flex-col items-center justify-center px-4 mx-10 rounded-lg"><h3 className=' mt-4 font-bold text-lg'>+</h3>
  <h4 className='font-semibold text-sm'>Join</h4></div></div>)}
      </div>
    )
                    
 
} 