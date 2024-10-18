import itemsIcon from "../assets/items-icon.svg";
import createdIcon from "../assets/created.svg";
import transferIcon from "../assets/transferred.svg";
import receiveIcon from "../assets/received.svg";
import { useState } from "react";

function DashboardMenu() {
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState();

  const handleProductCreation = function () {
    setModal((item) => !item);
  };

  const uploadImage = function () {
    document.getElementById("imageUpload").click();
    console.log(document.getElementById("imageUpload"));
  };

  const handleFileChange = function (event) {
    console.log(event.target.files[0]);
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        console.log(e.target.result);
        setImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <section className="flex flex-col flex-1 gap-8 px-10 py-20 bg-primary bg-opacity-30">
        <form action="" className="flex items-center gap-8 mb-16">
          <input
            type="search"
            placeholder="Type product ID"
            className="w-4/5 px-4 py-6 bg-transparent border-2 outline-none rounded-xl border-primary text-12"
          />
          <button
            type="submit"
            className="flex-1 px-4 py-6 font-medium text-white bg-cta rounded-xl text-12"
          >
            Check
          </button>
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

        <div>
          <h2 className="mb-8 font-semibold text-28">Recent activities</h2>

          <ul className="rounded-2xl bg-primary text-13">
            <li className="grid grid-cols-10 gap-4 px-10 py-6">
              <span className="col-span-1">Item Detail</span>
              <span className="col-start-6">Date</span>
              <span className="col-start-10">Activity</span>
            </li>

            <li className="grid items-center grid-cols-10 gap-4 px-10 py-6 bg-white">
              <figure className="col-span-1 h-36 bg-primary rounded-xl"></figure>

              <span className="col-span-3 col-start-2">
                <h5 className="mb-2 font-semibold">iPhone 16 Pro Max</h5>
                <p>Blockchain ID: 0xA79BF12009F8E4C1A4F2</p>
                <p>Registered by: 0xA12B34CD5678EF901 (you)</p>
              </span>
              <span className="col-start-6">11/10/2024</span>

              <button className="col-start-10 px-6 py-2 text-left bg-opacity-50 border-2 rounded-full bg-primary">
                Created
              </button>
            </li>

            <li className="grid items-center grid-cols-10 gap-4 px-10 py-6 bg-white">
              <figure className="col-span-1 h-36 bg-primary rounded-xl"></figure>

              <span className="col-span-3 col-start-2">
                <h5 className="mb-2 font-semibold">iPhone 16 Pro Max</h5>
                <p>Blockchain ID: 0xA79BF12009F8E4C1A4F2</p>
                <p>Registered by: 0xA12B34CD5678EF901 (you)</p>
              </span>
              <span className="col-start-6">11/10/2024</span>

              <button className="col-start-10 px-6 py-2 text-left bg-opacity-50 border-2 rounded-full bg-primary">
                Created
              </button>
            </li>

            <li className="grid items-center grid-cols-10 gap-4 px-10 py-6 bg-white">
              <figure className="col-span-1 h-36 bg-primary rounded-xl"></figure>

              <span className="col-span-3 col-start-2">
                <h5 className="mb-2 font-semibold">iPhone 16 Pro Max</h5>
                <p>Blockchain ID: 0xA79BF12009F8E4C1A4F2</p>
                <p>Registered by: 0xA12B34CD5678EF901 (you)</p>
              </span>
              <span className="col-start-6">11/10/2024</span>

              <button className="col-start-10 px-6 py-2 text-left bg-opacity-50 border-2 rounded-full bg-primary">
                Created
              </button>
            </li>

            <li className="grid items-center grid-cols-10 gap-4 px-10 py-6 bg-white">
              <figure className="col-span-1 h-36 bg-primary rounded-xl"></figure>

              <span className="col-span-3 col-start-2">
                <h5 className="mb-2 font-semibold">iPhone 16 Pro Max</h5>
                <p>Blockchain ID: 0xA79BF12009F8E4C1A4F2</p>
                <p>Registered by: 0xA12B34CD5678EF901 (you)</p>
              </span>
              <span className="col-start-6">11/10/2024</span>

              <button className="col-start-10 px-6 py-2 text-left bg-opacity-50 border-2 rounded-full bg-primary">
                Created
              </button>
            </li>

            <li className="grid items-center grid-cols-10 gap-4 px-10 py-6 bg-white rounded-b-2xl">
              <figure className="col-span-1 h-36 bg-primary rounded-xl"></figure>

              <span className="col-span-3 col-start-2">
                <h5 className="mb-2 font-semibold">iPhone 16 Pro Max</h5>
                <p>Blockchain ID: 0xA79BF12009F8E4C1A4F2</p>
                <p>Registered by: 0xA12B34CD5678EF901 (you)</p>
              </span>
              <span className="col-start-6">11/10/2024</span>

              <button className="col-start-10 px-6 py-2 text-left bg-opacity-50 border-2 rounded-full bg-primary">
                Created
              </button>
            </li>
          </ul>

          <button className="px-12 py-3 mt-6 text-white rounded-full text-13 bg-cta">
            View All Items {">"}
            {">"}
          </button>
        </div>
      </section>

      {modal && (
        <section className="absolute flex flex-col items-center w-full h-full p-10 bg-secondary bg-opacity-60 backdrop-blur">
          <button
            className="self-end block text-28 mb-10"
            onClick={handleProductCreation}
          >
            &times;
          </button>

          <form action="" className="w-1/2 flex flex-col items-center gap-3">
            <figure
              className="w-full h-[35rem] bg-opacity-55 rounded-2xl bg-secondary hover:cursor-pointer"
              onClick={uploadImage}
            >
              {image && <img src={image} alt="uploaded" />}
            </figure>

            <input
              type="file"
              id="imageUpload"
              accept="image/**"
              className="hidden"
              onChange={handleFileChange}
            />

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
            />

            <label
              htmlFor="description"
              className="self-start text-16 font-semibold mt-8 text-cta"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full h-56 p-4 bg-white rounded-2xl bg-opacity-55 outline-none text-16"
            ></textarea>
          </form>
        </section>
      )}
    </>
  );
}

export default DashboardMenu;
