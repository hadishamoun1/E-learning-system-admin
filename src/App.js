import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AddClassForm from "./Components/AddClass";
import ClassList from "./Components/ListClasses";
import ClassDetails from "./Components/ClassDetails"; // Import ClassDetails component
import StudentList from "./Components/StudentList";
import LoginPage from "./Components/Login";
import Navbar from "./Components/Navbar"; // Import the Navbar component
import "./App.css";

const App = () => {
  const [selectedClassId, setSelectedClassId] = useState(null);

  const NavbarWrapper = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login";
    return !isLoginPage && <Navbar />;
  };

  return (
    <Router>
      <div className="app-container">
        <NavbarWrapper /> {/* Conditionally render the Navbar */}
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-class" element={<AddClassForm />} />
          <Route
            path="/list-classes"
            element={<ClassList onClassSelect={setSelectedClassId} />}
          />
          <Route path="/class/:id" element={<ClassDetails />} />
          
          <Route path="/dashboard" />
         
        </Routes>
      </div>
    </Router>
  );
};

export default App;
