import React, { useState, useEffect } from "react";
import {
  handleGetProductById,
  handleUpdateProduct,
} from "../firebase/firestone";
import { useParams } from "react-router-dom";
import { StacksTestnet } from "@stacks/network";
import { openContractCall } from "@stacks/connect";
import { principalCV, uintCV } from "@stacks/transactions";
import { useTransactionStatus } from "../hooks/useTransactionStatus";

function VerifyItem() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [licensee, setLicensee] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [detail, setDetail] = useState(false);
  const [pId, setPID] = useState("");
  const { trackTransaction, status } = useTransactionStatus();

  const [error, setError] = useState("");

  // get entire product detail
  useEffect(
    function () {
      async function getProductById() {
        setError("");

        try {
          const data = await handleGetProductById(Number(id));
          const productData = data.docs.map((doc) => doc.data());
          data.forEach((doc) => setPID(doc.id));
          setProduct(productData);
        } catch (error) {
          setError(error.message);
        }
      }

      getProductById();
    },
    [id]
  );

  // check if licensee transaction is a success
  useEffect(
    function () {
      async function updateStatus() {
        setError("");
        try {
          await handleUpdateProduct(pId, {
            isLicense:
              status === "success"
                ? true
                : status === "pending"
                ? "pending"
                : "failed",
          });
        } catch (error) {
          setError("error updating the product status: ", error.message);
        }
      }

      if (pId) updateStatus();
    },
    [status, pId]
  );

  const handleLicenseProduct = async function () {
    const functionArgs = [uintCV(product[0].productId), principalCV(licensee)];

    const options = {
      network: new StacksTestnet(),
      contractAddress: "ST3DRW5EAHRNFXYAW9ZXT1Q6BQ0GXMDEX0ARXDCMA",
      contractName: "authentify-v4",
      functionName: "license-product",
      functionArgs,
      appDetails: {
        name: "Verdger",
        icon: window.location.origin + "/src/assets/verger-logo.svg",
      },
      onFinish: async function (data) {
        setError("");
        trackTransaction(data.txId);

        try {
          await handleUpdateProduct(pId, {
            productOwner: licensee,
            ownerHistory: [
              product[0].owner,
              licensee,
              ...(product[0].ownerHistory || ""),
            ],
          });
        } catch (error) {
          setError(error.message);
        }
      },
    };

    await openContractCall(options);
  };
  const handleProductTransfer = async function () {};

  return (
    <section className="flex flex-col items-center flex-1 gap-2 px-10 py-20 bg-opacity-30 bg-primary min-h-screen overflow-y-auto">
      <h1 className="mb-20 font-semibold text-center text-28 text-cta">
        Product Verification
      </h1>

      <form action="" className="flex items-center w-3/4 gap-4">
        <input
          type="search"
          placeholder="Type product ID"
          className="flex-1 p-4 border-2 outline-none text-16 rounded-xl"
        />
        <button className="w-64 px-10 py-4 text-white text-16 bg-cta rounded-xl">
          Verify
        </button>
      </form>
      <p className="-translate-x-32 text-12">
        Type your product/item ID in the input field above to verify the
        authenticity of your item
      </p>

      {error && <p className="text-center">{error}</p>}

      {product &&
        product.map((item, i) => (
          <React.Fragment key={i}>
            <h2 className="self-start mt-32 font-semibold text-28">
              Product Details
            </h2>
            <article className="flex items-center self-start w-full gap-8 mt-8 text-16 pr-48">
              <figure className="w-4/12 bg-white h-19 rounded-2xl overflow-hidden">
                <img
                  src={item.productImage}
                  alt=""
                  className="rounded-2xl w-full h-full"
                />
              </figure>

              <ul className="grid flex-1 grid-cols-2 gap-2">
                <li>
                  <span className="font-medium">Date Created:</span>{" "}
                  {new Date(item.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </li>
                <li>
                  <span className="font-medium">Registered By:</span>{" "}
                  {item.productOwner.slice(0, 16) + "...."}
                </li>
                <li>
                  <span className="font-medium">Blockchain ID:</span>{" "}
                  {item.blockchainId.slice(0, 16) + "...."}
                </li>
                <li>
                  <span className="font-medium">Ownership:</span> Transferred
                </li>
                <li>
                  <span className="font-medium">Product Name:</span>{" "}
                  {item.productName}
                </li>
                <li>
                  <span className="font-medium">Status:</span>{" "}
                  {item.status === "abort_by_response" && "Transaction Failed"}
                  {item.status === "success" && "Transaction Succeed"}
                </li>

                {detail && (
                  <li className="col-span-2">
                    <span className="font-medium">Description: </span>
                    {item.productDes}
                  </li>
                )}

                {isOpen && (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      className="outline-none rounded-2xl mt-2 p-4"
                      placeholder="Enter Licensee Address"
                      onChange={(e) => setLicensee(e.target.value)}
                    />
                    {licensee.length === 41 && (
                      <button
                        className="bg-cta px-10 py-3 text-white rounded-2xl"
                        onClick={handleLicenseProduct}
                      >
                        License
                      </button>
                    )}
                  </div>
                )}

                {detail && (
                  <div className="col-span-2 mt-8 font-semibold text-white flex items-start gap-3">
                    <button
                      className="bg-cta rounded-2xl px-10 py-4"
                      onClick={() => setIsOpen((bool) => !bool)}
                    >
                      Initiate License Product
                    </button>
                    <button
                      className="bg-cta rounded-2xl px-10 py-4"
                      onClick={handleProductTransfer}
                    >
                      Transfer Product
                    </button>
                  </div>
                )}

                {!detail && (
                  <button
                    className="col-span-2 px-10 py-4 mt-8 font-semibold text-white bg-cta rounded-2xl"
                    onClick={() => setDetail((bool) => !bool)}
                  >
                    More Details
                  </button>
                )}
              </ul>
            </article>
          </React.Fragment>
        ))}
    </section>
  );
}

export default VerifyItem;
