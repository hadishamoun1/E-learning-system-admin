import React from "react";
import AddClassForm from "./Components/AddClass"; // Adjust path as necessary
import "./App.css"; // Import your CSS file

const App = () => {
  return (
    <div className="app-container">
      <h1 className="header-title">Class Manager</h1>

      <AddClassForm />
    </div>
  );
};

export default App;
