import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";

const SellerDashboard = () => {
  const [messageRequests, setMessageRequests] = useState([]);

  useEffect(() => {
    const fetchMessageRequests = async () => {
      try {
        const res = await newRequest.get("/message-requests");
        setMessageRequests(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessageRequests();
  }, []);

  const handleAcceptRequest = async (requestId) => {
    try {
      const res = await newRequest.put(`/message-requests/accept/${requestId}`);
      alert("Request accepted, you can now chat!");
      // Handle further logic
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  const handleRejectRequest = async (requestId) => {
    try {
      const res = await newRequest.put(`/message-requests/reject/${requestId}`);
      alert("Request rejected");
      // Handle further logic
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div>
      <h1>Your Message Requests</h1>
      {messageRequests.length > 0 ? (
        <ul>
          {messageRequests.map((req) => (
            <li key={req._id}>
              <p>
                Request from {req.senderName} for gig: {req.gigTitle}
              </p>
              <button onClick={() => handleAcceptRequest(req._id)}>Accept</button>
              <button onClick={() => handleRejectRequest(req._id)}>Reject</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No message requests yet!</p>
      )}
    </div>
  );
};

export default SellerDashboard;
