import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Home/Loader";
const Signup = () => {
  const history = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    history("/");
  }
  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const [Message, setMessage] = useState("");
  const [Loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submit = async () => {
    try {
      if (Data.username === "" || Data.email === "" || Data.password === "") {
        alert("All fields are required");
      } else {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:1000/api/v1/sign-in",
          Data
        );
        setData({ username: "", email: "", password: "" });
        setLoading(false);
        setMessage(response.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      {Loading && (
        <div className="flex h-[100%] items-center justify-center">
          <Loader />
        </div>
      )}
      {Message && Message.length > 0 && Loading === false && (
        <div className="h-[98vh] flex items-center justify-center">
          <div className="text-yellow-500 text-xl bg-zinc-800 border border-yellow-500 font-semibold rounded px-4 py-3 ">
            {Message}
          </div>
        </div>
      )}
      {Message.length === 0 && Loading === false && (
        <div className=" h-[98vh] flex items-center justify-center">
          <div className="p-4 w-5/6 md:w-4/6 lg:w-2/6 rounded bg-gray-800">
            <div className="text-2xl font-semibold">Signup</div>
            <input
              type="username"
              placeholder="username"
              className="bg-gray-700 px-3 py-2 my-3 w-full rounded "
              name="username"
              value={Data.username}
              onChange={change}
            />
            <input
              type="email"
              placeholder="email"
              className="bg-gray-700 px-3 py-2 my-3 w-full rounded "
              name="email"
              value={Data.email}
              required
              onChange={change}
            />
            <input
              type="password"
              placeholder="password"
              className="bg-gray-700 px-3 py-2 my-3 w-full rounded "
              name="password"
              value={Data.password}
              onChange={change}
            />
            <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between">
              <button
                className="bg-blue-400  font-semibold text-black px-3 py-2 rounded"
                onClick={submit}
              >
                SignUp
              </button>
              <Link
                to="/login"
                className="text-gray-400 hover:text-gray-200 mt-2 lg:mt-0"
              >
                Already having an account? Login here
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
