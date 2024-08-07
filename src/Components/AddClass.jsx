import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchClasses } from "../slices/classSlice"; // Ensure this path is correct
import "./styles/AddClass.css";

const AddClassForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/classes", form);
      setForm({
        title: "",
        description: "",
        instructor: "",
      });
      alert("Class added successfully!");
      dispatch(fetchClasses()); // Fetch updated classes list
    } catch (error) {
      console.error("Error adding class:", error);
      alert("Failed to add class. Please try again.");
    }
  };

  return (
    <div className="add-class-form-container">
      <h2 className="form-title">Add New Class</h2>
      <form onSubmit={handleSubmit} className="add-class-form">
        <div className="form-group">
          <label htmlFor="title">Class Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="instructor">Instructor</label>
          <input
            type="text"
            id="instructor"
            name="instructor"
            value={form.instructor}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Class
        </button>
      </form>
    </div>
  );
};

export default AddClassForm;
