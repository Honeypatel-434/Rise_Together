import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import newRequest from "../../utils/newRequest";
import NotificationIcon from "../../pages/notificationicon/NotificationIcon"; 

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout");
      localStorage.setItem("currentUser", null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Rise Together</span>
          </Link>
          <span className="dot"></span>
        </div>
        
        <div className="links">
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              {currentUser.img ? (
                <img src={currentUser.img} alt="User" />
              ) : (
                <div className="defaultIcon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0"
                    />
                  </svg>
                </div>
              )}
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/mygigs">
                        My compaigns
                      </Link>
                      <Link className="link" to="/add">
                        Add New compaign
                      </Link>
                    </>
                  )}
                  {!currentUser.isSeller && (
                    <>
                      <Link className="link" to="/investment">
                        Investment
                      </Link>
                    </>
                  )}
                  
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" onClick={handleLogout}>
                    Logout
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">Sign in</Link>
              <Link className="link" to="/register">
                <button>Join</button>
              </Link>
            </>
          )}

          {/* Add the NotificationIcon component here */}
          {currentUser && <NotificationIcon />}
        </div>
      </div>

      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/gigs?cat=SmartDevices">
              Smart Devices 
            </Link>
            <Link className="link menuLink" to="/gigs?cat=AppSoftware">
              App and Software
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Robotics">
              Robotics
            </Link>
            <Link className="link menuLink" to="/gigs?cat=Blockchain">
              Blockchain and cryptography
            </Link>
            <Link className="link menuLink" to="/gigs?cat=SecurityPrivacy">
              Security and Privacy
            </Link>
            <Link className="link menuLink" to="/gigs?cat=logoDesign">
              Logo Design
            </Link>
            <Link className="link menuLink" to="/gigs?cat=AITools">
              AI Tools
            </Link>
            <Link className="link menuLink" to="/gigs?cat=others">
              Others
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
