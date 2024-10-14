"use client";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "../../app/globals.css";
import { ChildrenProp } from "../types";

const ToastProvider = ({ children }: ChildrenProp) => (
  <>
    {children}
    <ToastContainer />
  </>
);

export default ToastProvider;
