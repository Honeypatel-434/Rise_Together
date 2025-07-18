import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest"; // Assuming this is your API utility

function NotificationIcon() {
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await newRequest.get(`/notifications/${currentUser._id}`);
        const unread = res.data.filter((n) => !n.read).length; // count unread notifications
        setUnreadNotifications(unread); // Set the unread count
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    if (currentUser?._id) {
      fetchNotifications();
    }
  }, [currentUser]);

  return (
    <div className="notification-icon">
      <span className="icon">&#128276;</span> {/* Bell icon */}
      {unreadNotifications > 0 && (
        <span className="badge">{unreadNotifications}</span>
      )}
    </div>
  );
}

export default NotificationIcon;
