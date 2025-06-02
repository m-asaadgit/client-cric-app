// export default ProfileSlider;
import React, { useEffect, useRef } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import Divider from "../utils/Divider";
import { FaUserCircle } from "react-icons/fa";
import gsap from "gsap";
import { Link } from "react-router-dom";

interface Hosted {
  _id: string;
  name: string;
  type: string;
}

interface ProfileSliderProps {
  userName: string;
  hosted: Hosted[];
  setProfileDropper: React.Dispatch<React.SetStateAction<boolean>>;
  logOut: () => void;
  isAdmin: boolean;
}

function ProfileSlider({
  userName,
  hosted,
  isAdmin,
  logOut,
}: ProfileSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      sliderRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div
      ref={sliderRef}
      className="w-[90%] mx-auto absolute px-1 left-[5vw] top-[100%] z-[900] h-fit card2 rounded-b-md flex flex-col py-2 bg-gray-800 shadow-lg"
    >
      <div className="w-full mb-1 px-2 flex gap-2 capitalize items-center font-montserrat justify-between">
        <h1>{userName}</h1>
        <FaUserCircle />
      </div>
      <Divider />
      {isAdmin && (
        <div className="font-medium px-4 mt-2">
          <div className="flex justify-between">
            <h1>Tournaments Hosted</h1>
            {hosted?.filter((item) => item.type === "Tournament").length >
              2 && (
              <h1 className="font-extralight text-[#1e4ec7] cursor-pointer">
                View more
              </h1>
            )}
          </div>
          <Divider />
        </div>
      )}

      <div className="w-full flex flex-col gap-1 pt-2">
        {hosted &&
          isAdmin &&
          hosted
            .filter((item) => item.type === "Tournament")
            .slice(0, 2)
            .map((item, index) => (
              <Link
              to={`/${item.name}/all-matches/${item._id}`}
                key={index}
                className="w-[90%] pl-3 rounded-sm py-1 bg-zinc-900 flex items-center mx-auto"
              >
                {item.name} <IoMdArrowDropright size={20} />
              </Link>
            ))}
      </div>

      {isAdmin && (
        <div className="font-medium px-4 mt-2">
          <div className="flex justify-between">
            <h1>Series Hosted</h1>
          <div className="flex gap-2">
          <Link to={"/create/event"} className="text-yellow-300 font-extralight">Create Series</Link>

          {hosted?.filter((item) => item.type === "Series").length > 0 && (
              <h1 className="font-extralight text-[#1e4ec7] cursor-pointer">
                View more
              </h1>
            )}
          </div>
          </div>
          <Divider />
        </div>
      )}x
      {isAdmin && (
        <div className="w-full flex flex-col gap-1 pt-2">
          {hosted &&
            hosted
              .filter((item) => item.type === "Series")
              .slice(0, 2)
              .map((item, index) => (
                <Link
                to={`/${item.name}/all-matches/${item._id}`}

                  key={index}
                  className="w-[90%] pl-3 rounded-sm py-1 bg-zinc-900 flex items-center mx-auto"
                >
                  {item.name} <IoMdArrowDropright size={20} />
                </Link>
              ))}
        </div>
      )}

      <div className="flex w-[90%] mx-auto my-4 justify-between">
        <button className="bg-[#e91e1e] px-2 rounded-sm font-bold">
          Delete Account
        </button>
        <button
          onClick={() => logOut()}
          className="bg-[#d64a2e] px-2 rounded-sm font-bold"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

export default ProfileSlider;
