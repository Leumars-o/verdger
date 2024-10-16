import { Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardMenu from "./pages/DashboardMenu";
import VerifyItem from "./pages/VerifyItem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DashboardMenu />} />
          <Route path="dashboard" element={<DashboardMenu />} />
          <Route path="verify-item" element={<VerifyItem />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
