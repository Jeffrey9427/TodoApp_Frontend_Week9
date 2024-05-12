import "./App.css";
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Todo from "./pages/Todo";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const [cookies] = useCookies();
  useEffect(() => {
    //check for saved theme in cookies and change style accordingly
    const savedTheme = cookies.theme;
    if (savedTheme) {
        document.body.style = savedTheme === 'Light' ? 'background: #BEAEE2; color:#000;' : 'background: #744bd4; color:#000;';
    }
  }, [cookies]);

  return (
    <div>
        <Router>
          <Routes>
            <Route 
              path="/"
              element={<ProtectedRoute>
                <main>
                  <Landing />
                </main>
              </ProtectedRoute>}
            />
            <Route 
              path="/todo"
              element={<ProtectedRoute>
                  <Todo />
              </ProtectedRoute>}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;