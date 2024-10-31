import React from "react";
import { CiHeart } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaHeart } from "react-icons/fa";
import axios from "axios";


// Define the Cards functional component
const Cards = ({ home, setInputDiv, data, setUpdatedData }) => {

  // Set headers for API requests using local storage for user ID and token
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

   // Function to mark a task as complete
  const handleCompleteTask = async (id) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`, // API endpoint to mark a task as complete
        {},
        { headers }
      );
    } catch (error) {
      console.log(error); // Log any error that occurs
    }
  };

  // Function to mark a task as important
  const handleImportant = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-imp-task/${id}`, // API endpoint to update task importance
        {},
        { headers }
      );
      console.log(response.data.message); // Log success message from the response
    } catch (error) {
      console.log(error); // Log any error that occurs
    }
  };

  // Function to set up the task for updating
  const handleUpdate = (id, title, desc) => {
    setInputDiv("fixed"); // Show input for editing
    setUpdatedData({ id: id, title: title, desc: desc }); // Set the current task data for updates
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v2/delete-task/${id}`, // API endpoint to delete a task
        { headers }
      );
      console.log(response.data.message); // Log success message from the response
    } catch (error) {
      console.log(error); // Log any error that occurs
    }
  };


  // Render the component
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
      {data &&
        data.map((items, i) => (
          <div
            className=" flex flex-col justify-between bg-gray-800 rounded-sm p-4"
            key={i}
          >
            <div>
              <h3 className="text-xl font-semibold">{items.title}</h3>
              <p className="text-gray-300 my-2">{items.desc}</p>
            </div>
            <div className="mt-4 w-full flex items-center">
              <button
                className={` ${
                  items.complete === false ? "bg-red-400" : "bg-green-700"
                } p-2 rounded w-3/6`}
                onClick={() => handleCompleteTask(items._id)}
              >
                {items.complete === true ? "Completed" : "In Completed"}
              </button>
              <div className="text-white  p-2 w-3/6 text-2xl font-semibold flex justify-around">
                <button onClick={() => handleImportant(items._id)}>
                  {items.important === false ? (
                    <CiHeart />
                  ) : (
                    <FaHeart className="text-red-500" />
                  )}
                </button>
                {home !== "false" && (
                  <button
                    onClick={() =>
                      handleUpdate(items._id, items.title, items.desc)
                    }
                  >
                    <FaEdit />
                  </button>
                )}
                <button onClick={() => deleteTask(items._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}
      {home === "true" && (
        <button
          className=" flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
          onClick={() => setInputDiv("fixed")}
        >
          <IoAddCircleSharp className="text-5xl" />
          <h2 className="text-2xl mt-4 ">Add Task</h2>
        </button>
      )}
    </div>
  );
};

export default Cards;
