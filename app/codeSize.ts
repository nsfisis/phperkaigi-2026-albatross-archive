import type { SupportedLanguage } from "./types/SupportedLanguage";

function cleanCode(code: string, language: SupportedLanguage) {
  if (language === "php") {
    return code
      .replace(/\s+/g, "")
      .replace(/^<\?php/, "")
      .replace(/^<\?/, "")
      .replace(/\?>$/, "");
  } else {
    return code.replace(/\s+/g, "");
  }
}

export function calcCodeSize(
  code: string,
  language: SupportedLanguage,
): number {
  const trimmed = cleanCode(code, language);
  const utf8Encoded = new TextEncoder().encode(trimmed);
  return utf8Encoded.length;
}
