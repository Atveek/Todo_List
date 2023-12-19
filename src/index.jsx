import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";
import "./style.css";

const root = document.getElementById("atveek");

const root1 = createRoot(root);
root1.render(
  <>
    <App />
  </>
);
