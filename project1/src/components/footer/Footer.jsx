import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Explore</h2>
            <span>Campaigns</span>
            <span>Categories</span>
            <span>How It Works</span>
          </div>
          <div className="item">
            <h2>Company</h2>
            <span>About Us</span>
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
          <div className="item">
            <h2>Support</h2>
            <span>Help Center</span>
            <span>Trust & Safety</span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Rise Together</h2>
            <span>&copy; 2023</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="/img/twitter.png" alt="Twitter" />
              <img src="/img/facebook.png" alt="Facebook" />
              <img src="/img/instagram.png" alt="Instagram" />
            </div>
            <img src="/img/accessibility.png" alt="Accessibility" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
