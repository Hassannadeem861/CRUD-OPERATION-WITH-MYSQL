import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Crud from "./Components/Crud.js";
import ProductUpdateFunction from "./Components/Update.js";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Crud />}></Route>
          <Route path="/update/:id" element={<ProductUpdateFunction />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
