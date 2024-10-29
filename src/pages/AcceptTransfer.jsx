import React from "react";
import { useEffect } from "react";
import { handleQueryTransferProduct } from "../firebase/firestone";

export default function AcceptTransfer() {
  useEffect(function () {
    if (!sessionStorage.productOwner) return;

    async function getTransferProduct() {
      try {
        const data = await handleQueryTransferProduct(
          "ST3DRW5EAHRNFXYAW9ZXT1Q6BQ0GXMDEX0ARXDCMA"
        );

        console.log(data);
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

      <ul></ul>
    </section>
  );
}
