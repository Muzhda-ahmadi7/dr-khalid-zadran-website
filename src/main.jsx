import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LanguageProvider } from "./context/LanguageContext";
import "./index.css";

// Works both at "/" (local dev) and under a sub-path such as
// "/dr-khalid-zadran-website/" when deployed to GitHub Pages.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <LanguageProvider><App /></LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>
);