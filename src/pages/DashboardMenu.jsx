import itemsIcon from "../assets/items-icon.svg";

function DashboardMenu() {
  return (
    <section className="flex-1 px-10 py-50 bg-primary bg-opacity-30">
      <ul className="flex items-center gap-8">
        <li className="flex items-center w-1/4 gap-4 px-4 py-6 bg-white border-2 rounded-xl border-primary">
          <figure className="w-16 h-16 overflow-hidden">
            <img
              src={itemsIcon}
              alt="dashboard all items icon"
              className="block object-cover w-full h-full"
            />
          </figure>

          <div className="flex flex-col leading-tight">
            <span>12</span>
            <span>All items</span>
          </div>
        </li>
        <li className="flex items-center w-1/4 gap-4 px-4 py-6 bg-white border-2 rounded-xl border-secondary">
          <figure className="w-16 h-16 overflow-hidden">
            <img
              src={itemsIcon}
              alt="dashboard all items icon"
              className="block object-cover w-full h-full"
            />
          </figure>

          <div className="flex flex-col leading-tight">
            <span>12</span>
            <span>All items</span>
          </div>
        </li>

        <li className="flex items-center w-1/4 gap-4 px-4 py-6 bg-white border-2 rounded-xl border-secondary">
          <figure className="w-16 h-16 overflow-hidden">
            <img
              src={itemsIcon}
              alt="dashboard all items icon"
              className="block object-cover w-full h-full"
            />
          </figure>

          <div className="flex flex-col leading-tight">
            <span>12</span>
            <span>All items</span>
          </div>
        </li>
        <li className="flex items-center w-1/4 gap-4 px-4 py-6 bg-white border-2 rounded-xl border-secondary">
          <figure className="w-16 h-16 overflow-hidden">
            <img
              src={itemsIcon}
              alt="dashboard all items icon"
              className="block object-cover w-full h-full"
            />
          </figure>

          <div className="flex flex-col leading-tight">
            <span>12</span>
            <span>All items</span>
          </div>
        </li>
      </ul>
    </section>
  );
}

export default DashboardMenu;
