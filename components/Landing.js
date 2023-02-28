import "../flow/config";
import { useAuth } from "../contexts/AuthContext";
import Link from 'next/link';


function Landing() {
  const { currentUser, logOut, logIn } =
    useAuth();

  const AuthedState = () => {
    return (
      <div>
        <div>Logged in as: {currentUser?.addr ?? "No Address"}</div>
        <button className="button1" onClick={logOut}>Log Out</button>

      </div>
    );
  };

  const UnauthenticatedState = () => {
    return (
      <div>
        <button className="button1" onClick={logIn}>Log In</button>
      </div>
    );
  };


  return (
    <div>
      <div className="grid">
    {currentUser?.loggedIn ? <AuthedState /> : <UnauthenticatedState />}
      </div>
    </div>
  );
}

export default Landing;
