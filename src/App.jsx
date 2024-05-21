import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import Analytics from "./pages/Analytics";
import { OrderProvider } from "./components/OrderContext"; // Import the OrderProvider
import "./index.css";

function App() {
  return (
    <OrderProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </Router>
    </OrderProvider>
  );
}

export default App;
