import React, { useState } from "react";
import "./styles/AddClass.css";

const AddClassForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    instructor: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
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
