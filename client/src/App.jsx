import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardMenu from "./pages/DashboardMenu";
import VerifyItem from "./pages/VerifyItem";
import Assets from "./pages/Assets";
import Homepage from "./pages/Homepage";
import { SearchProviderContext } from "./context/searchContext";
import AcceptTransfer from "./pages/AcceptTransfer";

function App() {
  return (
    <SearchProviderContext>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/user" element={<Dashboard />}>
            <Route index element={<DashboardMenu />} />
            <Route path="dashboard" element={<DashboardMenu />} />
            <Route path="verify-item" element={<VerifyItem />} />
            <Route path="verify-item/:id" element={<VerifyItem />} />
            <Route path="my-assets" element={<Assets />} />
            <Route path="accept-transfer" element={<AcceptTransfer />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchProviderContext>
  );
}

export default App;
