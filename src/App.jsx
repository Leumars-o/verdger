import React from "react";
import { Route } from "react-router-dom";
import { BrowserRouter, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import DashboardMenu from "./pages/DashboardMenu";
import VerifyItem from "./pages/VerifyItem";
import Assets from "./pages/Assets";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/user" element={<Dashboard />}>
          <Route index element={<DashboardMenu />} />
          <Route path="dashboard" element={<DashboardMenu />} />
          <Route path="verify-item" element={<VerifyItem />} />
          <Route path="verify-item/:id" element={<VerifyItem />} />
          <Route path="my-assets" element={<Assets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
