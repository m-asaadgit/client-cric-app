
// import axios from "axios";
// import { useEffect, useState } from "react";
// import ProfileSlider from "./ProfileSlider";

// interface NavBarProps {
//   setSignUpPopUp: React.Dispatch<React.SetStateAction<boolean>>;
//   authResult: boolean;
// }

// interface Hosted {
//   _id: string;
//   name: string;
//   type: string;
// }

// const NavBar: React.FC<NavBarProps> = ({ setSignUpPopUp,authResult }) => {
//   const [token, setToken] = useState<string>(localStorage.getItem("token") ?? "");
//   const [profileDrop, setProfileDropper] = useState<boolean>(false);
//   const [userName, setUserName] = useState<string>("");
//   const [hosted, setHosted] = useState<Hosted[]>([]);
//   const [success, setSuccess] = useState<boolean>(false);
// console.log(authResult && authResult)
//   useEffect(() => {
//     console.log("hi")
//     const fetchUserData = async () => {
//       try {
//         if (!token) return;
//         console.log("hiii")
//         const response = await axios.get(`http://localhost:3000/api/user/req-user-data/${token}`);
//         setUserName(response.data.userName);
//         setHosted(response.data.hostedTournamentsAndSeries);
//         setSuccess(true);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, [token,authResult]);

//   const logOut = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     setSuccess(false);
//     setProfileDropper(false);
//     setUserName("");
//     setHosted([]);
//     setSignUpPopUp(false);
//   };

//   return (
//     <div className="headers w-full fixed  z-[1000] top-0 left-0 pt-4  h-[10vh] ">
//        <div className="headers w-full fixed  z-[1000] top-0 left-0  flex items-center justify-between h-[10vh] px-4">
//         <h1>App Name</h1>
//         {!success ? (
//           <button
//             onClick={() => setSignUpPopUp((prev) => !prev)}
//             className="bg-[#1d4ed8] px-2 rounded-sm shadow-2xl shadow-gray-800 py-1"
//           >
//             Sign up
//           </button>
//         ) : (
//           <button
//             onClick={() => setProfileDropper((prev) => !prev)}
//             className="bg-[#1d4ed8] px-2 rounded-sm shadow-2xl shadow-gray-800 py-1"
//           >
//             Your Profile
//           </button>
//         )}
//       </div>

//       {profileDrop && (
//         <ProfileSlider
//           userName={userName}
//           hosted={hosted}
//           setProfileDropper={setProfileDropper}
//           logOut={logOut}
//         />
//       )}
//     </div>
//   );
// };

// export default NavBar;
import axios from "axios";
import { useEffect, useState } from "react";
import ProfileSlider from "./ProfileSlider";

interface NavBarProps {
  setSignUpPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

interface Hosted {
  _id: string;
  name: string;
  type: string;
}

const NavBar: React.FC<NavBarProps> = ({ setSignUpPopUp, setToken , token }) => {
  const [profileDrop, setProfileDropper] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [hosted, setHosted] = useState<Hosted[]>([]);
  const [success, setSuccess] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Fetch token from localStorage once component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    console.log("hi");

    const fetchUserData = async () => {
      try {
        if (!token) return;  // Ensures no empty token request
        console.log("hiii");  // This will now log after token is set
        const response = await axios.get(`http://localhost:3000/api/user/req-user-data/${token}`);
        setUserName(response.data.userName);
        setHosted(response.data.hostedTournamentsAndSeries);
        setIsAdmin(response.data.isAdmin)
        setSuccess(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (token) {
      fetchUserData();
    }
  }, [token]);  // Runs only when token is set
  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    setSuccess(false);
    setProfileDropper(false);
    setUserName("");
    setHosted([]);
    setSignUpPopUp(false);
  };

  return (
    <div className="headers w-full fixed z-[1000] top-0 left-0 pt-4 h-[10vh]">
      <div className="headers w-full fixed z-[1000] top-0 left-0 flex items-center justify-between h-[10vh] px-4">
        <h1>App Name</h1>
        {!success ? (
          <button
            onClick={() => setSignUpPopUp((prev) => !prev)}
            className="bg-[#1d4ed8] px-2 rounded-sm shadow-2xl shadow-gray-800 py-1"
          >
            Sign up
          </button>
        ) : (
          <button
            onClick={() => setProfileDropper((prev) => !prev)}
            className="bg-[#1d4ed8] px-2 rounded-sm shadow-2xl shadow-gray-800 py-1"
          >
            Your Profile
          </button>
        )}
      </div>

      {profileDrop &&  (
        <ProfileSlider
          userName={userName}
          isAdmin={isAdmin}
          hosted={hosted}
          setProfileDropper={setProfileDropper}
          logOut={logOut}
        />
      )}
    </div>
  );
};

export default NavBar;
