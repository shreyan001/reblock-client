import React, { createContext, useContext, useEffect, useState } from "react";
import * as fcl from "@onflow/fcl";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, []);

  const signIn = async () => {
    await fcl.signIn();
  };

  const signOut = async () => {
    await fcl.signOut();
  };

  return (
    <WalletContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}

