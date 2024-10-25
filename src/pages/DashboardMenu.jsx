import React from "react";
import itemsIcon from "../assets/items-icon.svg";
import createdIcon from "../assets/created.svg";
import transferIcon from "../assets/transferred.svg";
import receiveIcon from "../assets/received.svg";
import userIcon from "../assets/user-icon.svg";
import walletIcon from "../assets/wallet.svg";

import { useState, useEffect } from "react";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import {
  handleGetProduct,
  handleProductUpload,
  handleUpdateProduct,
} from "../firebase/firestone";

import { openContractCall } from "@stacks/connect";
import { uintCV, stringAsciiCV } from "@stacks/transactions";
import generateRandomId from "../util/generateRandomId";
import { StacksTestnet } from "@stacks/network";
import { useTransactionStatus } from "../hooks/useTransactionStatus";
import { Link } from "react-router-dom";

function DashboardMenu() {
  const [image, setImage] = useState(sessionStorage.productImage || "");
  const [address, setAddress] = useState(sessionStorage.productOwner || "");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [pId, setPID] = useState(0);

  const [modal, setModal] = useState(false);
  const [error, setError] = useState("");

  const [products, setProducts] = useState([]);
  const [uploadStatus, setUploadStatus] = useState(false);

  const {
    // txId,
    status,
    // error: txError,
    trackTransaction,
  } = useTransactionStatus();

  // error message
  useEffect(
    function () {
      if (!error) return;

      if (error.includes("wallet")) alert("Connect Wallet");

      const timer = setTimeout(() => setError(""), 3000);

      return () => clearTimeout(timer);
    },
    [error]
  );

  // update product
  useEffect(
    function () {
      async function updateProduct() {
        if (!pId && status === "pending") return;

        try {
          await handleUpdateProduct(pId, { status: status });
        } catch (error) {
          console.log(error.message);
        }
      }

      updateProduct();
    },
    [pId, status]
  );

  // get product
  useEffect(
    function () {
      async function getProduct() {
        if (!address) return;

        try {
          const products = await handleGetProduct(address);
          products.forEach((doc) => console.log(doc.id, "=>", doc.data()));

          const newProducts = products.docs.map((doc) => doc.data());
          setProducts(newProducts);

          setUploadStatus(false);
        } catch (error) {
          console.log(error.message);
        }
      }

      getProduct();
    },
    [uploadStatus]
  );

  const appConfig = new AppConfig(["store_write", "publish_data"]);
  const userSession = new UserSession({ appConfig });

  async function handleCreateProduct(e) {
    e.preventDefault();

    const productId = generateRandomId();

    // validating data before saving to the database
    if (!address) return setError("Connect your wallet");
    if (!image) return setError("Upload an image for the product");
    if (!productName) return setError("Provide the product name");
    if (!description) return setError("Provide a description for your product");

    // blockchain function args
    const functionArgs = [
      uintCV(productId),
      stringAsciiCV(productName),
      stringAsciiCV(description),
    ];

    const options = {
      network: new StacksTestnet(),
      contractAddress: "ST3DRW5EAHRNFXYAW9ZXT1Q6BQ0GXMDEX0ARXDCMA",
      contractName: "authentify-v4",
      functionName: "create-product",
      functionArgs,
      appDetails: {
        name: "Verdger",
        icon: window.location.origin + "/src/assets/verger-logo.svg",
      },
      onFinish: async function (data) {
        try {
          trackTransaction(data.txId);

          const productObj = {
            productId,
            productName,
            productImage: image,
            productOwner: address,
            productDes: description,
            blockchainId: data.txId,
            createdAt: new Date().toISOString(),
          };

          const uploadedProductId = await handleProductUpload(productObj);
          setPID(uploadedProductId);

          // Optional: Add success notification
          alert("Product created successfully!");
          setUploadStatus(true);
        } catch (error) {
          setError("Firebase upload error:", error.message);
        }
      },
    };

    await openContractCall(options);
    setModal(false);
  }

  function handleConnectWallet() {
    showConnect({
      appDetails: {
        name: "Verdger",
        icon: window.location.origin + "/src/assets/verger-logo.svg",
      },
      redirectTo: "/",
      onFinish: () => {
        const userData = userSession.loadUserData();
        setAddress(userData.profile.stxAddress.testnet);
        sessionStorage.setItem(
          "productOwner",
          userData.profile.stxAddress.testnet
        );
        setUploadStatus(true);
      },
      userSession,
    });
  }

  const handleProductCreation = function () {
    setModal((item) => !item);
  };

  const uploadImage = function () {
    document.getElementById("imageUpload").click();
  };

  const handleFileChange = function (event) {
    console.log(event.target.files[0]);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log(e.target.result);
        setImage(e.target.result);
        sessionStorage.setItem("productImage", e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className="relative flex flex-col flex-1 gap-8 px-5 py-20 bg-primary bg-opacity-30 overflow-y-auto">
        <form action="" className="flex items-center gap-8 mb-16">
          <input
            type="search"
            placeholder="Type product ID"
            className="w-3/5 px-4 py-6 bg-transparent border-2 outline-none rounded-xl border-primary text-12"
          />

          <button
            type="submit"
            className="flex-1 px-4 py-6 font-medium text-white bg-cta rounded-xl text-12"
          >
            Check
          </button>

          {!address && (
            <button
              className="w-1/5 px-4 py-6 font-medium text-white bg-cta rounded-xl text-12 flex items-center justify-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                handleConnectWallet();
              }}
            >
              <img
                src={walletIcon}
                alt="an-icon-for-user"
                className="w-9 h-9"
              />
              <span>Connect Wallet</span>
            </button>
          )}

          {address && (
            <button
              className="flex-1 bg-cta px-4 py-6 text-white rounded-xl text-12 flex items-center justify-center gap-2"
              onClick={(e) => e.preventDefault()}
            >
              <img src={userIcon} alt="an-icon-for-user" className="w-9 h-9" />
              <span>{address.slice(0, 15) + "...."}</span>
            </button>
          )}
        </form>

        <ul className="flex items-center gap-8">
          <li className="flex items-center w-1/4 gap-4 px-4 py-6 bg-white border-2 rounded-xl border-primary">
            <figure className="w-24 h-24 overflow-hidden">
              <img
                src={itemsIcon}
                alt="dashboard all items icon"
                className="block object-cover w-full h-full"
              />
            </figure>

            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-28">12</span>
              <span className="text-12">All items</span>
            </div>
          </li>

          <li className="flex items-center w-1/4 gap-4 px-4 py-6 bg-white border-2 rounded-xl border-secondary">
            <figure className="w-24 h-24 overflow-hidden">
              <img
                src={createdIcon}
                alt="dashboard all items icon"
                className="block object-cover w-full h-full"
              />
            </figure>

            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-28">8</span>
              <span className="text-12">Created items</span>
            </div>
          </li>

          <li className="flex items-center w-1/4 gap-4 px-4 py-6 bg-white border-2 rounded-xl border-secondary">
            <figure className="w-24 h-24 overflow-hidden">
              <img
                src={transferIcon}
                alt="dashboard all items icon"
                className="block object-cover w-full h-full"
              />
            </figure>

            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-28">3</span>
              <span className="text-12">Transferred item</span>
            </div>
          </li>

          <li className="flex items-center w-1/4 gap-4 px-4 py-6 bg-white border-2 rounded-xl border-secondary">
            <figure className="w-24 h-24 overflow-hidden">
              <img
                src={receiveIcon}
                alt="dashboard all items icon"
                className="block object-cover w-full h-full"
              />
            </figure>

            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-28">1</span>
              <span className="text-12">Received item</span>
            </div>
          </li>
        </ul>

        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-semibold text-28">Your Items</h2>

            <button
              className="flex items-center justify-center gap-2 px-8 py-2 bg-white border-2 rounded-full text-12"
              onClick={handleProductCreation}
            >
              <span>Add new Item</span>
              <span>+</span>
            </button>
          </div>

          <div className="flex items-stretch gap-8 text-12 text-cta">
            {products.length === 0 && (
              <p className="text-center w-full text-16">
                Connect Your Wallet or Add a new Item
              </p>
            )}

            {products &&
              products.map(
                (product, i) =>
                  i <= 2 && (
                    <article
                      className="flex flex-col items-center w-1/3 gap-5 px-4 py-4 bg-secondary bg-opacity-20 rounded-3xl"
                      key={i}
                    >
                      <figure className="w-35 bg-white h-19 rounded-2xl">
                        <img
                          src={product.productImage}
                          alt="product image"
                          className="w-full h-full rounded-2xl"
                        />
                      </figure>

                      <div className="flex items-center justify-between w-full text-13">
                        <h4 className="font-semibold">{product.productName}</h4>
                        <button className="px-16 py-2 text-white rounded-full bg-cta">
                          Status:{" "}
                          {product.status === "abort_by_response"
                            ? "aborted"
                            : product.status === "success"
                            ? "success"
                            : "pending"}
                        </button>
                      </div>

                      <div className="grid w-full grid-cols-3 gap-4">
                        <p className="col-span-3">
                          Blockchain ID:{" "}
                          {product.blockchainId.slice(0, 25) + "........"}
                        </p>
                        <p className="col-span-3 mb-4">
                          Product ID: {product.productId}
                        </p>

                        <p className="col-span-1 font-semibold">
                          Date Created:
                        </p>
                        <p className="col-span-2">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </p>

                        {/* <p className="col-span-1 font-semibold">Location:</p>
                        <p className="col-span-2">Shenzen, China</p> */}

                        <p className="col-span-1 font-semibold">
                          Previous Owners:
                        </p>
                        <p className="col-span-2">
                          {product.previousOwners
                            ? product.previousOwners
                            : "None"}
                        </p>

                        {/* <button className="w-1/2 col-span-3 col-start-1 border-2 rounded-full border-secondary ml-44">
                          Ownership History
                        </button> */}
                      </div>

                      <Link
                        to={`/user/verify-item/${product.productId}`}
                        className="w-full py-2 text-white bg-cta rounded-xl text-13 text-center mt-10"
                      >
                        Product Details
                      </Link>
                    </article>
                  )
              )}
          </div>

          {products.length !== 0 && (
            <Link
              to="/my-assets"
              className="px-6 py-4 mt-6 text-white rounded-full text-13 bg-cta inline-block"
            >
              View All Items {">"}
              {">"}
            </Link>
          )}
        </div>

        <div>
          <h2 className="mb-8 font-semibold text-28">Recent activities</h2>

          <ul className="rounded-2xl bg-primary text-13 flex flex-col">
            <li className="grid grid-cols-10 gap-4 px-10 py-6">
              <span className="col-span-1">Item Detail</span>
              <span className="col-start-6">Date</span>
              <span className="col-start-10">Activity</span>
            </li>

            {products.length === 0 && (
              <p className="bg-white text-center py-8">
                There is no Recent Item
              </p>
            )}

            {products &&
              products.map((product, i) => (
                <li
                  className="grid items-center grid-cols-10 gap-4 px-10 py-6 bg-white"
                  key={i}
                >
                  <figure className="col-span-1 h-36 bg-primary rounded-xl">
                    <img
                      src={product.productImage}
                      alt="product image"
                      className="w-full h-full rounded-xl"
                    />
                  </figure>

                  <span className="col-span-3 col-start-2">
                    <h5 className="mb-2 font-semibold">
                      {product.productName}
                    </h5>
                    <p>
                      Blockchain ID:{" "}
                      {`${product.blockchainId?.slice(0, 25)}....`}
                    </p>
                  </span>
                  <span className="col-start-6">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>

                  <button className="col-start-10 px-6 py-2 text-left bg-opacity-50 border-2 rounded-full bg-primary">
                    {product.status === "abort_by_response" && "aborted"}
                    {product.status === "pending" && "pending"}
                    {product.status === "success" && "success"}
                    {!product.status && "pending"}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </section>

      {modal && (
        <section className="absolute top-0 left-0 flex flex-col items-center w-full min-h-screen p-10 bg-secondary bg-opacity-60 backdrop-blur">
          <button
            className="self-end block text-28 mb-4"
            onClick={handleProductCreation}
          >
            &times;
          </button>

          <h1 className="text-28 font-semibold">Add Product Item</h1>

          <form
            className="w-1/2 flex flex-col items-center gap-3 mt-8"
            onSubmit={handleCreateProduct}
          >
            <figure
              className="w-full h-[35rem] bg-opacity-55 rounded-2xl bg-secondary hover:cursor-pointer"
              onClick={uploadImage}
            >
              {image && (
                <img
                  src={image}
                  alt="uploaded"
                  className="w-full h-full object-cover rounded-2xl"
                />
              )}
            </figure>

            <input
              type="file"
              id="imageUpload"
              accept="image/**"
              className="hidden"
              onChange={handleFileChange}
            />
            {error.includes("image") && (
              <p className="self-start text-red-950 text-13">{error}</p>
            )}

            <label
              htmlFor="product-name"
              className="self-start text-16 font-semibold mt-8 text-cta"
            >
              Product Name
            </label>

            <input
              type="text"
              id="product-name"
              className="w-full p-4 bg-white rounded-2xl bg-opacity-55 outline-none text-16"
              onChange={(e) => setProductName(e.target.value)}
            />

            {error.includes("product name") && (
              <p className="self-start text-red-950 text-13">{error}</p>
            )}

            <label
              htmlFor="description"
              className="self-start text-16 font-semibold mt-8 text-cta"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full h-56 p-4 bg-white rounded-2xl bg-opacity-55 outline-none text-12"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            {error.includes("description") && (
              <p className="self-start text-red-950 text-13">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-cta mt-10 py-4 text-16 rounded-2xl text-white font-semibold"
            >
              Create Product
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default DashboardMenu;
