import React from "react";
import { CiFacebook, CiInstagram, CiMail, CiTwitter } from "react-icons/ci";
function Footer() {
  return (
    <footer className="bg-[#563A9C] text-white py-4">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6">
          {/* Facebook Icon */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-black text-2xl"
          >
            <i className="fab fa-facebook-f">
              <CiFacebook />
            </i>{" "}
            {/* Facebook Icon */}
          </a>
          {/* Instagram Icon */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-black text-2xl"
          >
            <i className="fab fa-instagram">
              <CiInstagram />
            </i>{" "}
            {/* Instagram Icon */}
          </a>
          {/* Twitter Icon */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-black text-2xl"
          >
            <i className="fab fa-twitter">
              <CiTwitter />
            </i>{" "}
            {/* Twitter Icon */}
          </a>
          {/* Email Icon */}
          <a
            href="mailto:support@example.com"
            className="text-white hover:text-black text-2xl"
          >
            <i className="fas fa-envelope">
              <CiMail />
            </i>{" "}
            {/* Email Icon */}
          </a>
        </div>

        <p className="mt-4 text-sm text-gray-300">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
