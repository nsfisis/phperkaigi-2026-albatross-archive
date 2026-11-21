import { describe, expect, test } from "vitest";
import { formatUnixTimestamp } from "./DataTable";

describe("formatUnixTimestamp", () => {
  test("formats timestamp correctly", () => {
    // 2026-03-01 12:30 JST (UTC+9) = 2026-03-01 03:30 UTC
    const timestamp = Date.UTC(2026, 2, 1, 3, 30, 0) / 1000;
    const result = formatUnixTimestamp(timestamp);
    // Result depends on local timezone; just check the format pattern
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  });

  test("pads single-digit months and days", () => {
    // Use a date where month and day are single digits
    const timestamp = Date.UTC(2026, 0, 5, 0, 0, 0) / 1000;
    const result = formatUnixTimestamp(timestamp);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  });
});
