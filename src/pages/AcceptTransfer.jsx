import React from "react";
import { useEffect } from "react";
import { handleQueryTransferProduct } from "../firebase/firestone";
import { useState } from "react";
import { Link } from "react-router-dom";
import { chain } from "../variable";
import { openContractCall } from "@stacks/connect";
import { uintCV } from "@stacks/transactions";

export default function AcceptTransfer() {
  const [products, setProducts] = useState([]);
  const [code, setCode] = useState("");

  useEffect(function () {
    if (!sessionStorage.productOwner) return;

    async function getTransferProduct() {
      try {
        const data = await handleQueryTransferProduct(
          "ST3DRW5EAHRNFXYAW9ZXT1Q6BQ0GXMDEX0ARXDCMA"
        );

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    getTransferProduct();
  }, []);

  const handleTransfer = async function () {
    const functionArgs = [uintCV(), uintCV(Number(code))];

    const options = {
      contractAddress: "ST3DRW5EAHRNFXYAW9ZXT1Q6BQ0GXMDEX0ARXDCMA",
      contractName: "authentify-v4",
      functionName: "accept-transfer",
      functionArgs,
      appDetails: {},
      onFinish: async function (data) {
        console.log(data.txId);
      },
    };

    await openContractCall(options);
  };

  return (
    <section className="flex flex-col items-start flex-1 gap-2 px-10 py-16 bg-opacity-30 bg-primary min-h-screen overflow-y-auto">
      <h1 className="mb-20 font-semibold text-center text-28 text-cta">
        Pending Transfers
      </h1>

      <ul className="w-full text-13">
        {products &&
          products.map((product, i) => (
            <li key={i} className="flex items-center gap-6">
              <figure className="w-1/4 h-52 overflow-hidden">
                <img
                  src={product.productImage}
                  alt="product image"
                  className="w-full h-full rounded-xl"
                />
              </figure>

              <div className="flex-1 grid grid-cols-4 gap-6">
                <span>Product Name: {product.productName}</span>
                <span>Product ID: {product.productId}</span>
                <span>
                  <Link
                    to={`https://explorer.hiro.so/txid/${product.blockchainId}?chain=${chain}`}
                    target="_blank"
                    className="underline underline-offset-1 hover:underline-offset-4"
                  >
                    Blockchain ID: {product.blockchainId.slice(0, 16) + "..."}
                  </Link>
                </span>
                <span>
                  Receiver:{" "}
                  {product.ownerHistory.map(
                    (item) =>
                      item.receiver ===
                        "ST3DRW5EAHRNFXYAW9ZXT1Q6BQ0GXMDEX0ARXDCMA" &&
                      "ST3DRW5EAHRNFXYAW9ZXT1Q6BQ0GXMDEX0ARXDCMA".slice(0, 16) +
                        "..."
                  )}
                </span>

                <span>
                  Sender:{" "}
                  {product.ownerHistory.map(
                    (item) =>
                      item.receiver ===
                        "ST3DRW5EAHRNFXYAW9ZXT1Q6BQ0GXMDEX0ARXDCMA" &&
                      item.sender.slice(0, 16) + "..."
                  )}
                </span>

                <input
                  type="number"
                  placeholder="Enter Transfer Code to accept product"
                  className="px-4 py-2 outline-none focus:border-2 focus:border-secondary transition-all rounded-md col-span-2"
                  onChange={(e) => setCode(e.target.value)}
                  value={code}
                  autoFocus
                />

                {code.length === 4 && (
                  <button
                    className="bg-cta text-white px-4 py-2 rounded-lg col-start-4"
                    onClick={handleTransfer}
                  >
                    {product.ownerHistory.map(
                      (item) =>
                        item.transferType === "initiate-transfer" &&
                        "Accept Product"
                    )}
                  </button>
                )}
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
}
