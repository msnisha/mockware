import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">&copy; 2022 Mockware.xyz</div>
      <div className="footer__signature">
        {"Made with love by "}
        <a href="https://www.linkedin.com/in/msnisha/" target="_blank">
          Nish
        </a>
        {" / "}
        <a href="https://community.pega.com/hackathon?" target="_blank">
          {"Pega Community Hackothon 2022"}
        </a>
      </div>
    </footer>
  );
}

export default Footer;
