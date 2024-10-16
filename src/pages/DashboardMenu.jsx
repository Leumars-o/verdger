import itemsIcon from "../assets/items-icon.svg";
import createdIcon from "../assets/created.svg";
import transferIcon from "../assets/transferred.svg";
import receiveIcon from "../assets/received.svg";

function DashboardMenu() {
  return (
    <section className="flex flex-col flex-1 gap-8 px-10 py-50 bg-primary bg-opacity-30">
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

      <form action="" className="flex items-center gap-8 mt-24">
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
    </section>
  );
}

export default DashboardMenu;
