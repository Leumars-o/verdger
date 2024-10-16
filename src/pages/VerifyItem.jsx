function VerifyItem() {
  return (
    <section className="flex flex-col items-center flex-1 gap-2 py-20 bg-opacity-30 bg-primary">
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
    </section>
  );
}

export default VerifyItem;
