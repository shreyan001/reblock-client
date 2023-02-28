import "@picocss/pico";
import "../styles/globals.css";
import Link from "next/link";
import AuthProvider from "../contexts/AuthContext";
import TransactionProvider from "../contexts/TransactionContext";
import "../styles/custom.css";
import 'react-toastify/dist/ReactToastify.css';
import MobileWarning from '../components/functions/CheckRes.js'
import {createReactClient,studioProvider,LivepeerConfig} from '@livepeer/react';
import { useState,useEffect } from "react";
import "../styles/Cards.css"
import "../styles/Screen.css"



function MyApp({ Component, pageProps }) {

  const [showPopup,setShowPopup] = useState(false);

  
const client = createReactClient ({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_PUBL_KEY
  }),
});


  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1024) {
      setShowPopup(true);
    }
  }, []);
  
  return (
    <div>
   
      <main className="container">
      <MobileWarning showPopup={showPopup} closePopup={()=>{setShowPopup(false)}}/>
      <LivepeerConfig client={client}>
        <TransactionProvider>
          <AuthProvider>
            <Component {...pageProps} />
          </AuthProvider>
        </TransactionProvider>
        </LivepeerConfig>
      </main>

    </div>
  );
}

export default MyApp;
