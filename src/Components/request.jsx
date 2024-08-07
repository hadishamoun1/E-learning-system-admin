import React, { useState, useEffect } from "react";
import "./styles/request.css"; // Import the CSS file

// Utility function to get token from session storage
const getToken = () => {
  return sessionStorage.getItem("token");
};

// Function to fetch withdrawal requests from the backend
const fetchWithdrawalRequests = async () => {
  const token = getToken();
  const response = await fetch("http://localhost:5000/api/withdraw", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch withdrawal requests");
  }
  return response.json();
};

// Function to approve a withdrawal request
const approveRequest = async (requestId, classId, userId) => {
  const token = getToken();
  const response = await fetch(
    `http://localhost:5000/api/${requestId}/approve`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ classId, userId }), // Sending classId and userId
    }
  );

  if (!response.ok) {
    throw new Error("Failed to approve withdrawal request");
  }
};

// Function to reject a withdrawal request
const rejectRequest = async (requestId) => {
  const token = getToken();
  const response = await fetch(
    `http://localhost:5000/api/${requestId}/reject`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to reject withdrawal request");
  }
};

const AdminWithdrawalRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch withdrawal requests from the backend
    const getRequests = async () => {
      try {
        const requests = await fetchWithdrawalRequests();
        setRequests(requests);
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
      }
    };

    getRequests();
  }, []);

  const handleApprove = async (requestId, classId, userId) => {
    try {
      await approveRequest(requestId, classId, userId);
      setRequests(requests.filter((request) => request._id !== requestId));
      alert("Request approved and user removed from the class.");
    } catch (error) {
      alert("Error approving withdrawal request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);
      setRequests(requests.filter((request) => request._id !== requestId));
      alert("Request rejected. User remains enrolled.");
    } catch (error) {
      alert("Error rejecting withdrawal request");
    }
  };

  return (
    <div className="admin-container">
      <h1 className="admin-heading">Withdrawal Requests</h1>
      <table className="admin-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Class</th>
            <th>Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request.user.name}</td>
              <td>{request.class.title}</td>
              <td>{request.reason}</td>
              <td>
                <button
                  className="btn-approve"
                  onClick={() =>
                    handleApprove(
                      request._id,
                      request.class._id,
                      request.user._id
                    )
                  }
                >
                  Approve
                </button>
                <button
                  className="btn-reject"
                  onClick={() => handleReject(request._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminWithdrawalRequests;
