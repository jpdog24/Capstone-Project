import React, { useEffect, useState } from "react";
import Cards from "../components/Home/Cards";
import axios from "axios";
import Loader from "../components/Home/Loader";
const ImportantTasks = () => {
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-imp-tasks",
        { headers }
      );
      setData(response.data.data);
    };
    fetch();
  });

  return (
    <>
      {!Data && (
        <div className="flex items-center justify-center h-screen md:h-[100%]">
          <Loader />
        </div>
      )}
      {Data && Data.length === 0 && (
        <div className="flex items-center justify-center h-screen md:h-[100%]">
          <h1 className="text-2xl font-semibold text-gray-500">
            No Important Task
          </h1>
        </div>
      )}
      {Data && <Cards home={"false"} data={Data} />}
    </>
  );
};

export default ImportantTasks;
