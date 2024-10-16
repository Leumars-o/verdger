import { Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardMenu from "./pages/DashboardMenu";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route index element={<DashboardMenu />} />
          <Route path="dashboard" element={<DashboardMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
