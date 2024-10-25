import React from "react";
import { Link } from "react-router-dom";

// images
import vergerLogo from "../assets/verger-logo.svg";

export default function Homepage() {
  return (
    <>
      <nav className="bg-white flex items-center justify-between px-20 py-12 text-16">
        <h1>
          <Link>
            <img src={vergerLogo} alt="verger logo" />
          </Link>
        </h1>

        <ul className="flex items-center gap-32">
          <li>
            <Link>How it works</Link>
          </li>
          <li>
            <Link>FAQS</Link>
          </li>
          <li>
            <Link>Features</Link>
          </li>
        </ul>

        <div className="flex items-center gap-8">
          <button className="bg-white border-2 border-btn-dark px-12 py-3 rounded-xl text-cta">
            Login
          </button>
          <button className="bg-cta-1 text-white rounded-xl px-12 py-3">
            Sign up
          </button>
        </div>
      </nav>

      <header></header>
    </>
  );
}
