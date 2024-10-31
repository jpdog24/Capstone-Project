import React, { useEffect, useState } from "react";
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa6";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import axios from "axios";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";


// Define Sidebar functional component
const Sidebar = () => {

  // Set up Redux dispatch for managing authentication state
  const dispatch = useDispatch();
  // Use navigate for programmatic navigation
  const history = useNavigate();
  // State to control visibility of mobile navigation
  const [MobileNav, setMobileNav] = useState("hidden");
  // Array containing navigation item data

  const data = [
    {
      title: "All tasks",
      icon: <CgNotes />,
      link: "/",
    },
    {
      title: "Important tasks",
      icon: <MdLabelImportant />,
      link: "/importantTasks",
    },
    {
      title: "Completed tasks",
      icon: <FaCheckDouble />,
      link: "/completedTasks",
    },
    {
      title: "Incompleted tasks",
      icon: <TbNotebookOff />,
      link: "/incompletedTasks",
    },
  ];
  const [Data, setData] = useState();
  // Function to handle user logout
  const logout = () => {
    // Dispatch logout action to Redux store
    dispatch(authActions.logout());
    // Clear user-related data from local storage
    localStorage.clear("id");
    localStorage.clear("token");
    // Navigate to signup page
    history("/signup");
  };
  // Set up headers for the API request using local storage values
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  // useEffect hook to fetch data when component mounts or dependencies change

  useEffect(() => {
    const fetch = async () => {
      // Send a GET request to the API to fetch all tasks
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  });

  return (
    <>
      {Data && (
        <div>
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
          <hr />
        </div>
      )}
      <div className="my-4 text-white  md:hidden flex items-center justify-end">
        <button
          className="text-2xl"
          onClick={() => {
            MobileNav === "hidden"
              ? setMobileNav("block")
              : setMobileNav("hidden");
          }}
        >
          {MobileNav === "hidden" ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </button>
      </div>
      <div className={`${MobileNav} md:block`}>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300"
          >
            {items.icon}&nbsp; {items.title}
          </Link>
        ))}
      </div>

      <div>
        <button className="bg-gray-600 w-full p-2 rounded" onClick={logout}>
          Log Out{" "}
        </button>
      </div>
    </>
  );
};

export default Sidebar;
