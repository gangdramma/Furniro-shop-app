import React from "react";
import Facebook from "../assets/images/facebook";
import Twitter from "../assets/images/twitter";
import "../assets/styles/footer.scss";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="footer-container">
      <div className="footer-components">
        <div className="footer-content">
          <span>© {currentYear} Shelly.</span> Terms of use <span>and</span>{" "}
          privacy policy.
        </div>
        <div className="footer-contacts">
          <Facebook />
          <Twitter />
        </div>
      </div>
    </div>
  );
};

export default Footer;
