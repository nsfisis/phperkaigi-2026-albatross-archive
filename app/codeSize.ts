function cleanCode(code: string) {
  return code
    .replace(/\s+/g, "")
    .replace(/^<\?php/, "")
    .replace(/^<\?/, "")
    .replace(/\?>$/, "");
}

export function calcCodeSize(code: string): number {
  const trimmed = cleanCode(code);
  const utf8Encoded = new TextEncoder().encode(trimmed);
  return utf8Encoded.length;
}
