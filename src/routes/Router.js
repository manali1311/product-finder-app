import React from "react";
import { Route, Routes } from "react-router-dom";
import List from "../views/products/List";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import FormModal from "../views/products/FormModal";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/create" element={<FormModal />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default Router;
