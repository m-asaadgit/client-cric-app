import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import SignUp from "../components/loginSignupComponents/SignUp";
import Login from "../components/loginSignupComponents/Login";
import RequestResetPassword from "../components/loginSignupComponents/RequestResetPassword";

function Home() {
  const [signUpPopUp, setSignUpPopUp] = useState<boolean>(false);
  const [authResult, setAuthResult] = useState<boolean>(false);
  const [logInPopUp, setLoginPopUp] = useState<boolean>(false);
  const [requestResetPasswordPopUp, setRequestResetPasswordPopUp] =
    useState<boolean>(false);
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") ?? ""
  );

  useEffect(() => {
    // Sync token from local storage when it updates
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token") ?? "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <div className="card w-full min-h-[100vh] relative">
      <NavBar setSignUpPopUp={setSignUpPopUp} setToken={setToken} token={token} />
      {/* Conditionally render the SignUp modal */}
      {/* {signUpPopUp && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <SignUp
            setLoginPopUp={setLoginPopUp}
            
            setAuthResult={setAuthResult}
            setSignUpPopUp={setSignUpPopUp}
          />
        </div>
      )}{" "} */}
      {signUpPopUp && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <SignUp
            setLoginPopUp={setLoginPopUp}
            setAuthResult={setAuthResult}
            setSignUpPopUp={setSignUpPopUp}
          />
        </div>
      )}
      {logInPopUp && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <Login
            setLoginPopUp={setLoginPopUp}
            setSignUpPopUp={setSignUpPopUp}
            setRequestResetPasswordPopUp={setRequestResetPasswordPopUp}
            setToken ={setToken }
          />
        </div>
      )}
      {requestResetPasswordPopUp && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50">
          <RequestResetPassword
            setRequestResetPasswordPopUp={setRequestResetPasswordPopUp}
            setLoginPopUp={setLoginPopUp}
          />
        </div>
      )}
    </div>
  );
}

export default Home;
