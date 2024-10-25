import React from "react";
import { Link } from "react-router-dom";

// images
import vergerLogo from "../assets/verger-logo.svg";
import dashboardShot from "../assets/dashboard-shot.svg";
import expBlock from "../assets/exp-block.svg";
import blockchainImage from "../assets/blockchain-img.svg";

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

      <header className="flex flex-col items-center gap-16 bg-primary-light bg-opacity-30 min-h-[50rem] pt-24">
        <h1 className="text-[5rem] font-light w-3/5 text-center leading-tight">
          Keep your items secured and verified on the blockchain
        </h1>

        <form className="flex items-center justify-center gap-4 text-16 w-full">
          <input
            type="text"
            className="bg-primary-light w-[85rem] px-10 py-8 border-2 border-primary outline-none rounded-xl"
            placeholder="Enter the name of the product here"
          />
          <button className="bg-cta-1 text-white rounded-xl px-24 py-8">
            Check
          </button>
        </form>

        <figure className="mt-auto overflow-hidden">
          <img
            src={dashboardShot}
            alt="dashboard shot"
            className="w-full h-full"
          />
        </figure>
      </header>

      <main>
        <section className="bg-primary-light bg-opacity-30 py-24 px-32 overflow-hidden">
          <div className="flex flex-col items-center gap-8">
            <img src={expBlock} alt="" />
            <h2 className="text-[3.4rem] font-light w-3/4 text-center">
              Verdger combines supply chain and digital identity management on
              the blockchain to provide product verification.
            </h2>
          </div>

          <ul className="grid grid-cols-3 mt-20">
            <li className="bg-white border-2 border-primary rounded-3xl shadow-inner-custom h-96 px-10 py-14 flex items-start gap-8">
              <figure className="w-20 h-auto">
                <img
                  src={blockchainImage}
                  alt=""
                  className="w-full h-full block object-cover"
                />
              </figure>

              <div className="h-full flex-1 flex flex-col items-stretch gap-3">
                <h3 className="font-light text-28">Blockchain</h3>
                <p className="text-16 text-justify font-light hyphens-auto">
                  Verdger leverages the power of blockchain technology to create
                  a secure and tamper-proof record of product information
                  ensuring that that once data is recorded, it remains immutable
                  and verifiable by all parties.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
