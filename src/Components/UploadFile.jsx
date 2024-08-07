import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile, clearUploadState } from "../slices/uploadSlice";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector((state) => state.upload);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      dispatch(uploadFile(file));
    }
  };

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {error && <p>Error: {error}</p>}
      {success && <p>Success: {success}</p>}
    </div>
  );
};

export default UploadFile;
