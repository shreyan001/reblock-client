import * as fcl from "@onflow/fcl";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useTransaction } from "./TransactionContext";

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const { initTransactionState, setTxId, setTransactionStatus } =
    useTransaction();
  const [currentUser, setUser] = useState({ loggedIn: false, addr: undefined });

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const logOut = async () => {
    await fcl.unauthenticate();
    setUser({ addr: undefined, loggedIn: false });
  };

  const logIn = () => {
    fcl.logIn();
  };

  const value = {
    currentUser,
    logOut,
    logIn,
  };

  console.log("AuthProvider", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
