/**
 * @vitest-environment jsdom
 */
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test } from "vitest";
import TournamentPage from "./TournamentPage";

afterEach(() => {
  cleanup();
});

describe("TournamentPage", () => {
  test("shows loading state initially", () => {
    render(<TournamentPage tournamentId="1" />);
    expect(screen.getByText("Loading...")).toBeDefined();
  });

  test("shows error for invalid tournament ID", () => {
    render(<TournamentPage tournamentId="abc" />);
    expect(screen.getByText("Invalid tournament ID")).toBeDefined();
  });

  test("shows error for zero tournament ID", () => {
    render(<TournamentPage tournamentId="0" />);
    expect(screen.getByText("Invalid tournament ID")).toBeDefined();
  });
});
