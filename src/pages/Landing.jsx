import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { useState } from "react"
import { useEffect } from "react";
import { Cookies } from 'react-cookie';
import axios from "axios";

export default function Landing() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  // const { currentUser, logout } = useAuth();
  const [username, setUsername] = useState("");
  
  function logout(){
    const cookies = new Cookies(null, { path: '/' });
    cookies.remove('session')
    cookies.remove('user_id')
  }

  async function handleSignOut() {
    setError(""); 

    try {
      await logout()
      navigate("/login");
    } catch {
      setError("Failed to log out")
    }
  }

  useEffect(() => {
    async function getUsername() {
      try {
        const cookies = new Cookies(); // Initialize cookies
        const session = cookies.get('session'); // Get the session data
        const user_id = cookies.get('user_id');
        if (!session || !user_id) {
          throw new Error('Session data not found');
        }
        const response = await axios.get(`http://localhost:8000/users/${user_id}`); // Make a request to your backend to get the username
        setUsername(response.data.username); // Set the username state
      } catch (error) {
        setError("Error fetching username: " + error.message);
      }
    }

    getUsername();
  }, []);

  return (  
    <>
      <div className="bg-white px-12 py-6 rounded-lg shadow-xl mt-28">
        <div className="flex justify-center">
          <h1 className="text-black tracking-[.025em] font-semibold mt-3 mb-8 text-3xl">Hey, welcome back :D</h1>
        </div>

        <div className="flex justify-center">
          <h1 className="text-black tracking-[.025em] text-black font-semibold mt-3 mb-12 text-3xl underline italic">{username}</h1>
        </div>

        <div className="flex justify-center">
          <Link to="/todo">
            <button className="px-5 py-2.5 rounded-lg shadow-xl bg-green-500 hover:bg-green-600 text-white">Go to Todo List</button>
          </Link>
        </div>

        <div className="flex justify-center mt-8 mb-3">
            <button className="px-5 bg-red-600 py-2.5 rounded-lg shadow-xl hover:bg-red-700 w-36 text-white" onClick={handleSignOut}>Sign Out</button>
        </div>

        {
            error && 
            <div className="text-black justify-center flex text-red-500 italic text-sm">
                {error}
            </div>
        }

      </div>

      <div className="absolute bottom-6 w-full font-bold text-lg left-0 text-center italic">
        <p>Made by Jeffrey (2602118484)</p>
      </div>
    </>
  );
}