import React from "react";
import { useEffect } from "react";
import { handleQueryTransferProduct } from "../firebase/firestone";
import { useState } from "react";

export default function AcceptTransfer() {
  const [products, setProducts] = useState([]);

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

  return (
    <section className="flex flex-col items-start flex-1 gap-2 px-10 py-16 bg-opacity-30 bg-primary min-h-screen overflow-y-auto">
      <h1 className="mb-20 font-semibold text-center text-28 text-cta">
        Pending Transfers
      </h1>

      <ul>
        {products &&
          products.map((product, i) => (
            <li key={i}>
              <figure className="w-32 h-32 overflow-hidden">
                <img
                  src={product.productImage}
                  alt="product image"
                  className="w-full h-full"
                />
              </figure>
              <span>Product Name: {product.productName}</span>
              <span>Product ID: {product.productId}</span>
              <span>Blockchain ID: {product.blockchainId}</span>
              <span>
                Receiver:{" "}
                {product.ownerHistory.map(
                  (item) =>
                    item.receiver ===
                    "ST3DRW5EAHRNFXYAW9ZXT1Q6BQ0GXMDEX0ARXDCMA"
                )}
              </span>
            </li>
          ))}
      </ul>
    </section>
  );
}
