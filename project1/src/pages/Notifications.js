import React, { useState, useEffect } from "react";
import newRequest from "../../utils/newRequest";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications for the current user (seller)
    const fetchNotifications = async () => {
      try {
        const res = await newRequest.get(`/notifications/${currentUser._id}`);
        setNotifications(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id}>
              {notification.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Notifications;
