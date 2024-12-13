import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Footer, Loader, Nav } from "./components";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function App() {
  const { loading } = useSelector((state) => state.loader);

  return (
    <>
      <ToastContainer />
      <Nav />
      <Outlet />
      {loading && <Loader />}
      <Footer />
    </>
  );
}

export default App;
