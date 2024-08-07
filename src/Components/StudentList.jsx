import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudents } from "../slices/classSlice"; // Import the fetchStudents action

const StudentList = ({ classId }) => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.classes);

  useEffect(() => {
    if (classId) {
      dispatch(fetchStudents(classId));
    }
  }, [classId, dispatch]);

  if (!classId) return <p>Please select a class</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Students Enrolled</h2>
      <ul>
        {students.map((student) => (
          <li key={student._id}>{student.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
