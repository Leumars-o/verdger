import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";

// images
import vergerLogo from "../assets/verger-logo.svg";
import dashboardShot from "../assets/dashboard-shot.svg";
import expBlock from "../assets/exp-block.svg";
import blockchainImage from "../assets/blockchain-img.svg";
import ownershipImg from "../assets/ownership-img.svg";
import originImg from "../assets/origin-img.svg";
import transparencyImg from "../assets/transparency-img.svg";
import howItWorks from "../assets/howItWorks.svg";
import list from "../assets/list.svg";
import socials from "../assets/socials.svg";
import { searchProvider } from "../context/searchContext";

// import { cvToJSON, hexToCV } from "@stacks/transactions";

// console.log(
//   cvToJSON(
//     hexToCV(
//       "0x080c0000000204636f64650100000000000000000000000000000070076d6573736167650d00000017496e76616c69642070726f64756374206c6963656e7365"
//     )
//   )
// );

export default function Homepage() {
  const {
    product,
    setProduct,
    isSearching,
    searchErr,
    setSearchErr,
    handleSearch,
  } = searchProvider();

  const [search, setSearch] = useState("");

  // login and signup
  const [address, setAddress] = useState(sessionStorage.productOwner || "");
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!searchErr) return;
      const timer = setTimeout(() => setSearchErr(""), 3000);

      return () => clearTimeout(timer);
    },
    [searchErr]
  );
  const appConfig = new AppConfig(["store_write", "publish_data"]);
  const userSession = new UserSession({ appConfig });

  const handleAuthenticate = function () {
    if (address) return navigate("/user");

    showConnect({
      appDetails: {
        name: "Verdger",
        icon: window.location.orgin + "/assets/verger-logo.svg",
      },
      onFinish: () => {
        const user = userSession.loadUserData();
        setAddress(user.profile.stxAddress.testnet);
        sessionStorage.setItem("productOwner", user.profile.stxAddress.testnet);
        navigate("/user");
      },
    });
  };

  const handleFormSearch = async function (e) {
    e.preventDefault();

    if (!search) return setSearchErr("There is no search value");

    try {
      const data = await handleSearch(search);
      if (data.docs.length === 0)
        throw new Error("There is no product that match your search results");

      data.forEach((docs) => setProduct(docs.data()));
    } catch (error) {
      setSearchErr(error.message);
    }
  };

  const handleCloseProduct = function () {
    setProduct(undefined);
  };

  const handleSubcribe = function (e) {
    e.preventDefault();
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
          <button
            className="bg-white border-2 border-btn-dark px-12 py-3 rounded-xl text-cta"
            onClick={handleAuthenticate}
          >
            Login
          </button>
          <button
            className="bg-cta-1 text-white rounded-xl px-12 py-3"
            onClick={handleAuthenticate}
          >
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
          onSubmit={handleFormSearch}
        >
          <input
            type="text"
            className="bg-primary-light w-[85rem] px-10 py-8 border-2 border-primary outline-none rounded-xl"
            placeholder="Enter the name of the product here"
            onChange={(e) => setSearch(e.target.value)}
          />
          {searchErr && (
            <p className="absolute top-32 left-[26rem] text-red-800 transition-all duration-700">
              {searchErr}
            </p>
          )}
          <button className="bg-cta-1 text-white rounded-xl px-24 py-8">
            {!isSearching && "Check"}
            {isSearching && "Searching"}
          </button>
        </form>

        {product && (
          <article className="w-[85rem] flex items-center gap-8 text-13">
            <figure className="w-1/3">
              <img
                src={product?.productImage}
                alt=""
                className="w-full h-full rounded-2xl"
              />
            </figure>

            <ul className="grid flex-1 grid-cols-2 gap-2">
              <li>
                <span className="font-medium">Date Created:</span>{" "}
                {new Date(product?.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </li>
              <li>
                <span className="font-medium">Registered By:</span>{" "}
                {product?.productOwner?.slice(0, 16) + "...."}
              </li>
              <li>
                <span className="font-medium">Blockchain ID:</span>{" "}
                {product?.blockchainId?.slice(0, 16) + "...."}
              </li>
              {/* <li>
                <span className="font-medium">Ownership:</span> Transferred
              </li> */}
              <li>
                <span className="font-medium">Product Name:</span>{" "}
                {product.productName}
              </li>
              <li>
                <span className="font-medium">Status:</span>{" "}
                {product.status === "abort_by_response" && "Failed"}
                {product.status === "success" && "Success"}
              </li>
              <li className="col-span-2">
                <span className="font-medium">Description: </span>
                {product.productDes}
              </li>

              <button
                className="text-left bg-cta-1 text-white px-5 py-2 rounded-lg w-1/2 mt-3"
                onClick={handleCloseProduct}
              >
                Close Product
              </button>
            </ul>
          </article>
        )}

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

        <section className="flex items-center justify-between px-32 py-24">
          <figure>
            <img src={list} alt="" />
          </figure>

          <figure>
            <img src={howItWorks} alt="" />
          </figure>
        </section>

        <section className="bg-primary-light bg-opacity-30 py-24 px-32 overflow-hidden">
          <h2 className="text-28 text-cta-1 mb-10">
            Frequently Asked Questions?
          </h2>

          <ul className="grid grid-cols-3 gap-8">
            <li className="bg-white h-35 px-8 rounded-3xl">
              <h3 className="text-[2.5rem] text-cta-1 font-light py-10 border-b-2 border-primary">
                How do I register an Item on Verdger?
              </h3>
              <p className="py-8 text-[1.8rem] text-cta-1 font-light">
                Simply add the item to your assets through the dashboard. A
                unique blockchain ID will be automatically generated.
              </p>
            </li>

            <li className="bg-white h-35 px-8 rounded-3xl">
              <h3 className="text-[2.5rem] text-cta-1 font-light py-10 border-b-2 border-primary">
                Can I Transfer Ownership of an Item?
              </h3>
              <p className="py-8 text-[1.8rem] text-cta-1 font-light">
                Yes, Verdger allows easy ownership transfers, with all changes
                recorded on the blockchain.
              </p>
            </li>

            <li className="bg-white h-35 px-8 rounded-3xl">
              <h3 className="text-[2.5rem] text-cta-1 font-light py-10 border-b-2 border-primary">
                What happens if an item is flagged as stolen?
              </h3>
              <p className="py-8 text-[1.8rem] text-cta-1 font-light">
                The item’s status will update, and you will be notified. Others
                can view the flagged status when verifying the item.
              </p>
            </li>

            <li className="bg-white h-35 px-8 rounded-3xl">
              <h3 className="text-[2.5rem] text-cta-1 font-light py-10 border-b-2 border-primary">
                Can anyone see the journey of my registered items?
              </h3>
              <p className="py-8 text-[1.8rem] text-cta-1 font-light">
                Yes, anyone with the item’s unique ID can track and verify its
                journey.
              </p>
            </li>

            <li className="bg-white h-35 px-8 rounded-3xl">
              <h3 className="text-[2.5rem] text-cta-1 font-light py-10 border-b-2 border-primary">
                Can I recover an item flagged as stolen?
              </h3>
              <p className="py-8 text-[1.8rem] text-cta-1 font-light">
                Yes, if an asset is flagged as stolen and later recovered, you
                can update its status through your dashboard to reflect that it
                is no longer missing.
              </p>
            </li>

            <li className="bg-white h-35 px-8 rounded-3xl">
              <h3 className="text-[2.5rem] text-cta-1 font-light py-10 border-b-2 border-primary">
                Are they any fees for registering assets on Verdger
              </h3>
              <p className="py-8 text-[1.8rem] text-cta-1 font-light">
                Some blockchain transactions may incur minimal gas fees,
                depending on the network. Verdger will notify you of any
                applicable fees before completing the registration process.
              </p>
            </li>
          </ul>
        </section>

        <section className="bg-primary-light bg-opacity-30 py-24 px-32 flex items-center justify-center">
          <article className="rounded-3xl bg-cta-1 bg-opacity-60 flex flex-col items-center justify-between py-10 px-8 w-full text-white h-[26rem]">
            <h2 className="text-[4rem] font-semibold">
              Let&apos;s keep in touch
            </h2>

            <p className="text-16 text-center w-1/2">
              Stay updated and receive latest updates on our BETA release, Drop
              your email and no worries, we won’t spam your inbox.
            </p>

            <form
              className="flex items-stretch justify-center gap-6 text-16 w-full"
              onSubmit={handleSubcribe}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent outline-none border-b-2 border-b-white px-6 py-3 w-1/3"
                required
              />
              <button className="bg-white text-cta-1 px-10 rounded-2xl">
                Subscribe
              </button>
            </form>
          </article>
        </section>
      </main>

      <footer className="px-32 py-8 bg-primary-light bg-opacity-30 border-opacity-30 border-t-2 border-secondary text-16 flex items-center gap-8">
        <p>&copy; 2024</p>
        <ul className="flex gap-8 mr-auto">
          <li>Contact us</li>
          <li>Privacy Policy</li>
          <li>Terms of use</li>
        </ul>

        <img src={socials} alt="" />
      </footer>
    </>
  );
}
