import React, { useState, useEffect } from "react";


export default function MobileWarning({showPopup,closePopup}) {

    if(showPopup===false) {return null} ;


  return (
    <>
      {showPopup && (
        <div className="popup">
          <div className="popup-content bg-black1 p-6 border-0 w-1/2
          ">
            <h2>Mobile/Tablet Warning</h2>
            <p>
              This website may not be optimized for smaller screens. Please
              switch to a laptop or desktop computer for the best experience.
            </p>
            <button className="button1 py-2" onClick={closePopup}>
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
}