import React, { useState, useEffect } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from "../components/Home/InputData";
import Loader from "../components/Home/Loader";

// Functional component for displaying all tasks
const AllTasks = () => {

   // State for controlling the visibility of input form
  const [InputDiv, setInputDiv] = useState("hidden");

  // State for storing fetched data
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title: "",
    desc: "",
  });

   // Headers for API requests
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };


  // Fetching data from API on component mount

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        { headers }
      );
      setData(response.data.data);
    };


    // Check if user is authenticated before fetching data
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      fetch();
    }
  });
  return (
    <>
      {!Data && (
        <div className="flex items-center justify-center h-[100%]">
          <Loader />
        </div>
      )}
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoAddCircleSharp className="text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300" />
          </button>
        </div>
        {Data && (
          <Cards
            home={"true"}
            setInputDiv={setInputDiv}
            data={Data.tasks}
            setUpdatedData={setUpdatedData}
          />
        )}
      </div>
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        UpdatedData={UpdatedData}
        setUpdatedData={setUpdatedData}
      />
    </>
  );
};

export default AllTasks;
