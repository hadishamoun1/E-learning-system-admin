import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchStudents } from "../slices/classSlice";
import "./styles/ClassDetails.css";

const ClassDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedClass, students } = useSelector((state) => state.classes);

  useEffect(() => {
    if (selectedClass._id) {
      dispatch(fetchStudents(selectedClass._id));
    }
  }, [dispatch, selectedClass._id]);

  return (
    <div>
      <button className="back-button" onClick={() => navigate("/list-classes")}>
        <span>&#8592;</span> Back to Classes
      </button>
      <div className="class-details-container">
        <div className="class-details">
          <h2>{selectedClass.title}</h2>
          <p>{selectedClass.description}</p>
        </div>
        <h3>Enrolled Students</h3>
        <ul className="student-list">
          {students.length ? (
            students.map((student) => (
              <li key={student._id} className="student-card">
                {student.name}
              </li>
            ))
          ) : (
            <p>No students enrolled.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ClassDetails;
