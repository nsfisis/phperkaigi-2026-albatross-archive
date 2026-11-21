import { config } from "@fortawesome/fontawesome-svg-core";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "./tailwind.css";
import "./shiki.css";
import App from "./App";
import type { PageData } from "./pageData";

config.autoAddCss = false;

const root = document.getElementById("root");
const dataElement = document.getElementById("page-data");
if (!root || !dataElement?.textContent) {
  throw new Error("Prerendered page is broken");
}
const data = JSON.parse(dataElement.textContent) as PageData;

hydrateRoot(
  root,
  <StrictMode>
    <App data={data} />
  </StrictMode>,
);
