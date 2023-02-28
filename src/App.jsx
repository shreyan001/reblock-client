import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboard from './pages/Onboard';
import { useState } from 'react';
// import WalletButton from './components/Wallet';




function App() {

  return (
   
    <div className="App">
      
      <Router>
        <Routes>
          <Route path="/" element={<Onboard />} />
        </Routes>
      </Router>
    </div>
   


  );
}

export default App;