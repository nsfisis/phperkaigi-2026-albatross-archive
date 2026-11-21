import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import type { PageData } from "./pageData";

export { pageTitle } from "./pageData";

export function render(data: PageData): string {
  return renderToString(
    <StrictMode>
      <App data={data} />
    </StrictMode>,
  );
}
