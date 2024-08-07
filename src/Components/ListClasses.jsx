import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { fetchClasses, setSelectedClassId } from "../slices/classSlice";
import "./styles/ClassList.css"; // Import the CSS file

const ClassList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate hook
  const { classes, loading, error } = useSelector((state) => state.classes);

  useEffect(() => {
    dispatch(fetchClasses());
  }, [dispatch]);

  const handleClassSelect = (id) => {
    dispatch(setSelectedClassId(id));
    navigate(`/class/${id}`); // Navigate to ClassDetails page
  };

  if (loading) return <p>Loading classes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="class-list">
      <h2>Available Classes</h2>
      <ul>
        {classes.map((cls) => (
          <li key={cls._id} className="class-card">
            <h3>{cls.title}</h3>
            <p>{cls.description}</p>
            <button onClick={() => handleClassSelect(cls._id)}>
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClassList;
