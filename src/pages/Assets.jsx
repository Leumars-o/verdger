function Assets() {
  return (
    <section className="flex flex-col items-center flex-1 gap-2 px-10 py-20 bg-opacity-30 bg-primary">
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

      <div className="mt-32">
        <h2 className="mb-8 font-semibold text-28">Your Items</h2>
        {/* <div className="flex items-center justify-between mb-8"></div> */}

        <div className="flex items-stretch gap-8 text-12 text-cta">
          <article className="flex flex-col items-center w-1/3 gap-5 px-4 py-4 bg-secondary bg-opacity-20 rounded-3xl">
            <figure className="w-32 bg-white h-19 rounded-2xl"></figure>

            <div className="flex items-center justify-between w-full text-13">
              <h4 className="font-semibold">iPhone 16 Pro Max</h4>
              <button className="px-16 py-2 text-white rounded-full bg-cta">
                Status: Legit
              </button>
            </div>

            <div className="grid w-full grid-cols-3 gap-4">
              <p className="col-span-3">
                Blockchain ID: 0x8f29e7bf6627A9D85d3212c
              </p>
              <p className="col-span-3 mb-4">Product ID: 27A9D85d3212c</p>

              <p className="col-span-1 font-semibold">Date Created:</p>
              <p className="col-span-2">11th October, 2024</p>

              <p className="col-span-1 font-semibold">Location:</p>
              <p className="col-span-2">Shenzen, China</p>

              <p className="col-span-1 font-semibold">Previous Owners:</p>
              <p className="col-span-2">Owner 1 - 0x8f29e7...A9D85212c</p>

              <button className="w-1/2 col-span-3 col-start-1 border-2 rounded-full border-secondary ml-44">
                Ownership History
              </button>
            </div>

            <button className="w-full py-2 text-white bg-cta rounded-xl text-13">
              Product Details
            </button>
          </article>

          <article className="flex flex-col items-center w-1/3 gap-5 px-4 py-4 bg-secondary bg-opacity-20 rounded-3xl">
            <figure className="w-32 bg-white h-19 rounded-2xl"></figure>

            <div className="flex items-center justify-between w-full text-13">
              <h4 className="font-semibold">iPhone 16 Pro Max</h4>
              <button className="px-16 py-2 text-white rounded-full bg-cta">
                Status: Legit
              </button>
            </div>

            <div className="grid w-full grid-cols-3 gap-4">
              <p className="col-span-3">
                Blockchain ID: 0x8f29e7bf6627A9D85d3212c
              </p>
              <p className="col-span-3 mb-4">Product ID: 27A9D85d3212c</p>

              <p className="col-span-1 font-semibold">Date Created:</p>
              <p className="col-span-2">11th October, 2024</p>

              <p className="col-span-1 font-semibold">Location:</p>
              <p className="col-span-2">Shenzen, China</p>

              <p className="col-span-1 font-semibold">Previous Owners:</p>
              <p className="col-span-2">Owner 1 - 0x8f29e7...A9D85212c</p>

              <button className="w-1/2 col-span-3 col-start-1 border-2 rounded-full border-secondary ml-44">
                Ownership History
              </button>
            </div>

            <button className="w-full py-2 text-white bg-cta rounded-xl text-13">
              Product Details
            </button>
          </article>

          <article className="flex flex-col items-center w-1/3 gap-5 px-4 py-4 bg-secondary bg-opacity-20 rounded-3xl">
            <figure className="w-32 bg-white h-19 rounded-2xl"></figure>

            <div className="flex items-center justify-between w-full text-13">
              <h4 className="font-semibold">iPhone 16 Pro Max</h4>
              <button className="px-16 py-2 text-white rounded-full bg-cta">
                Status: Legit
              </button>
            </div>

            <div className="grid w-full grid-cols-3 gap-4">
              <p className="col-span-3">
                Blockchain ID: 0x8f29e7bf6627A9D85d3212c
              </p>
              <p className="col-span-3 mb-4">Product ID: 27A9D85d3212c</p>

              <p className="col-span-1 font-semibold">Date Created:</p>
              <p className="col-span-2">11th October, 2024</p>

              <p className="col-span-1 font-semibold">Location:</p>
              <p className="col-span-2">Shenzen, China</p>

              <p className="col-span-1 font-semibold">Previous Owners:</p>
              <p className="col-span-2">Owner 1 - 0x8f29e7...A9D85212c</p>

              <button className="w-1/2 col-span-3 col-start-1 border-2 rounded-full border-secondary ml-44">
                Ownership History
              </button>
            </div>

            <button className="w-full py-2 text-white bg-cta rounded-xl text-13">
              Product Details
            </button>
          </article>
        </div>

        <button className="px-6 py-4 mt-6 text-white rounded-full text-13 bg-cta">
          View All Items {">"}
          {">"}
        </button>
      </div>
    </section>
  );
}

export default Assets;
