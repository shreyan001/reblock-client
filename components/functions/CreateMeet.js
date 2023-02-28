import React, { useState } from 'react';
import axios from 'axios';
import { Web3Storage } from 'web3.storage';
import { useNavigate } from 'react-router-dom';

const CreateMeet = ({address,onClose,meetMod}) => {

  if(meetMod===false){return null};
  const navigate = useNavigate();
  const [meetName, setMeetName] = useState('');
  const [meetLogo, setMeetLogo] = useState('');
   const [meetId, setMeetId] = useState('');

  const [loading, setLoading] = useState(false);
  const [logoCid, setLogoCid] = useState(null);
  const [uploadError, setUploadError] = useState(null);

  const handleLogoUpload = async (event) => {
    setLoading(true);
    setUploadError(null);

    const file = event.target.files[0];

    const storage = new Web3Storage({ token: import.meta.env.VITE_REACT_APP_WEB3_STORAGE_TOKEN });

    try {
      const cid = await storage.put([file], 'nft.png', { type: 'image/png' });
      setLogoCid(cid);
    } catch (error) {
      console.log(error);
      setUploadError('An error occurred while uploading the logo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!logoCid) {
      setUploadError('Please upload a logo before submitting the form.');
      return;
    }

    const data = { meetName, meetLogo: `https://w3s.link/ipfs/${logoCid}`, Owner:address };
    try {
      await axios.post('/api/meets', data).then(response=>navigate(`/meet/${response.data.meetId}`))
     
    } catch (error) {
      console.log(error);
    }

    setMeetName('');
    setMeetLogo('');
    
  };



  return (
    <div className="flex justify-center items-center h-screen popup">
      <div className="bg-black2 rounded-lg w-1/2 p-6 shadow-lg">
        <div className='w-11/12 h-fit mx-auto flex flex-row justify-between items-center'>
          <h2 className="text-center text-2xl">Create New Meet</h2><div  onClick={onClose} className='cursor-pointer w-fit px-1 bg-black rounded-sm h-fit'><span className='text-lg font-bold'>X</span></div></div>
        
        <h3 className='my-5 ml-4 text-lgæ font-semibold'>Owner:&nbsp;{address}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="meetName">
              Meet Name:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-black1 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="meetName"
              value={meetName}
              onChange={(event) => setMeetName(event.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-bold mb-2" htmlFor="meetLogo">
              Meet Logo:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
              type="file"
              id="meetLogo"
              onChange={handleLogoUpload}
              required
            />
            {loading && <p className="text-gray-700 text-sm mt-2">Uploading logo...</p>}
            {logoCid && <p className="text-green-500 text-sm mt-2">Logo uploaded successfully!</p>}
            {uploadError && <p className="text-red-500 text-sm mt-2">{uploadError}</p>}
          </div>
         
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded button1 w-auto h-12 text-base focus:outline-none focus:shadow-outline"
          >
            Create Meet
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateMeet;
