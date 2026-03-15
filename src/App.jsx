import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route
          path="/category/:id"
          element={<Category />}
        />

      </Routes>

    </BrowserRouter>
  );
}