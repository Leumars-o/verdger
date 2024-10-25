import React from "react";
import { Link } from "react-router-dom";

// images
import vergerLogo from "../assets/verger-logo.svg";
import dashboardShot from "../assets/dashboard-shot.svg";
import expBlock from "../assets/exp-block.svg";
import blockchainImage from "../assets/blockchain-img.svg";
import ownershipImg from "../assets/ownership-img.svg";
import originImg from "../assets/origin-img.svg";
import transparencyImg from "../assets/transparency-img.svg";
import { useState } from "react";
import { useEffect } from "react";

export default function Homepage() {
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(
    function () {
      if (!error) return;
      const timer = setTimeout(() => setError(""), 3000);

      return () => clearTimeout(timer);
    },
    [error]
  );

  const handleSearch = async function (e) {
    e.preventDefault();
    setError("");

    if (!search) return setError("There is no search value");
  };

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

        <form
          className="flex items-center justify-center gap-4 text-16 w-full relative"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            className="bg-primary-light w-[85rem] px-10 py-8 border-2 border-primary outline-none rounded-xl"
            placeholder="Enter the name of the product here"
            onChange={(e) => setSearch(e.target.value)}
          />
          {error && (
            <p className="absolute top-32 left-[26rem] text-red-800 transition-all duration-700">
              {error}
            </p>
          )}
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

          <ul className="grid grid-cols-5 gap-6 mt-20">
            <li className="bg-white border-2 col-span-2 border-primary rounded-3xl shadow-inner-custom h-96 px-8 py-14 flex items-start gap-14">
              <figure className="w-32 h-auto">
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

            <li className="bg-white border-2 col-span-3 border-primary rounded-3xl shadow-inner-custom h-96 px-8 py-14 flex items-start gap-14">
              <figure className="w-32 h-auto">
                <img
                  src={ownershipImg}
                  alt=""
                  className="w-full h-full block object-cover"
                />
              </figure>

              <div className="h-full w-2/3 flex flex-col items-stretch gap-3">
                <h3 className="font-light text-28">Ownership</h3>
                <p className="text-16 text-justify font-light hyphens-auto">
                  Easily transfer or receive ownership of assets with full
                  traceability on Verdger, This creates trust between parties
                  and eliminates the risk of disputes over authenticity or
                  ownership.
                </p>
              </div>
            </li>

            <li className="bg-white border-2 col-span-3 border-primary rounded-3xl shadow-inner-custom h-96 px-8 py-14 flex items-start gap-14">
              <figure className="w-32 h-auto">
                <img
                  src={originImg}
                  alt=""
                  className="w-full h-full block object-cover"
                />
              </figure>

              <div className="h-full w-2/3 flex flex-col items-stretch gap-3">
                <h3 className="font-light text-28">Origin</h3>
                <p className="text-16 text-justify font-light hyphens-auto">
                  With Verdger, you can trace every product back to its origin.
                  Whether it’s a piece of jewelry, electronics, or valuable
                  goods. This transparency helps validate the authenticity of
                  products and provides insights into their entire lifecycle.
                </p>
              </div>
            </li>

            <li className="bg-white border-2 col-span-2 border-primary rounded-3xl shadow-inner-custom h-96 px-8 py-14 flex items-start gap-14">
              <figure className="w-32 h-auto">
                <img
                  src={transparencyImg}
                  alt=""
                  className="w-full h-full block object-cover"
                />
              </figure>

              <div className="h-full w-2/3 flex flex-col items-stretch gap-3">
                <h3 className="font-light text-28">Transparency</h3>
                <p className="text-16 text-justify font-light hyphens-auto">
                  Verdger ensures end-to-end transparency throughout the supply
                  chain by making each product&apos;s journey visible to all
                  stakeholders. All changes from registration to ownership
                  changes are all recorded on the blockchain.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
