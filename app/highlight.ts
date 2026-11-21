import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, type JSX } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { codeToHast } from "./shiki.bundle";

// https://shiki.matsu.io/packages/next
export async function highlight(code: string) {
  let out;
  try {
    out = await codeToHast(code.trimEnd(), {
      lang: "php",
      theme: "github-light",
    });
  } catch {
    // Fallback to plaintext (no highlight).
    out = await codeToHast(code.trimEnd(), {
      lang: "text",
      theme: "github-light",
    });
  }

  return toJsxRuntime(out, {
    Fragment,
    jsx,
    jsxs,
  }) as JSX.Element;
}
