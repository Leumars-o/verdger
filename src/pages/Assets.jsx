import React, { useState, useEffect } from "react";
import { handleGetProduct } from "../firebase/firestone";
import { Link } from "react-router-dom";

function Assets() {
  const [products, setProducts] = useState([]);

  useEffect(function () {
    async function getProducts() {
      try {
        const product = await handleGetProduct(sessionStorage.productOwner);
        const newProducts = product.docs.map((doc) => doc.data());
        setProducts(newProducts);
      } catch (error) {
        console.log(error);
      }
    }

    getProducts();
  }, []);

  return (
    <section className="flex flex-col items-center flex-1 gap-2 px-5 py-20 bg-opacity-30 bg-primary overflow-y-auto">
      <h1 className="mb-20 font-semibold text-center text-28 text-cta">
        My Assets
      </h1>

      <form action="" className="flex items-center w-3/4 gap-4">
        <input
          type="search"
          placeholder="Type product ID"
          className="flex-1 p-4 border-2 outline-none text-16 rounded-xl"
        />
        <button className="w-64 px-10 py-4 text-white text-16 bg-cta rounded-xl">
          Search
        </button>
      </form>

      <div className="mt-32 w-full">
        <h2 className="mb-8 font-semibold text-28 text-center">Your Items</h2>

        {products.length === 0 && (
          <p className="w-full text-center text-16">
            Try connecting your wallet or{" "}
            <Link to="/dashboard" className="underline underline-offset-4">
              Go Add a Product
            </Link>
          </p>
        )}

        <div className="grid grid-cols-3 items-stretch gap-8 text-12 text-cta">
          {products &&
            products.map((product, i) => (
              <article
                className="flex flex-col items-center gap-5 px-4 py-4 bg-secondary bg-opacity-20 rounded-3xl"
                key={i}
              >
                <figure className="w-35 bg-white h-19 rounded-2xl">
                  <img
                    src={product.productImage}
                    alt={`${product.productName} image`}
                    className="w-full h-full rounded-2xl"
                  />
                </figure>

                <div className="flex items-center justify-between w-full text-13">
                  <h4 className="font-semibold">{product.productName}</h4>
                  <button className="px-16 py-2 text-white rounded-full bg-cta">
                    Status: {product.status === "abort_by_response" && "abort"}
                    {product.status === "success" && "success"}
                  </button>
                </div>

                <div className="grid w-full grid-cols-3 gap-4">
                  <p className="col-span-3">
                    Blockchain ID: {product.blockchainId.slice(0, 16) + "....."}
                  </p>
                  <p className="col-span-3 mb-4">
                    Product ID: {product.productId}
                  </p>

                  <p className="col-span-1 font-semibold">Date Created:</p>
                  <p className="col-span-2">
                    {new Date(product.createdAt).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>

                  <p className="col-span-1 font-semibold">Previous Owners:</p>
                  <p className="col-span-2">Owner 1 - 0x8f29e7...A9D85212c</p>

                  <button className="w-1/2 col-span-3 col-start-1 border-2 rounded-full border-secondary ml-44">
                    Ownership History
                  </button>
                </div>

                <Link
                  to={`/verify-item/${product.productId}`}
                  className="w-full py-2 text-white text-center bg-cta rounded-xl text-13"
                >
                  Product Details
                </Link>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Assets;
