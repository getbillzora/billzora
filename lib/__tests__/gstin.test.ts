import { describe, it, expect } from "vitest";
import { isValidGstin, looksLikeGstin } from "../gstin";

describe("isValidGstin", () => {
  it("accepts a valid GSTIN (correct checksum)", () => {
    // Well-known valid sample GSTIN.
    expect(isValidGstin("27AAPFU0939F1ZV")).toBe(true);
  });
  it("rejects wrong length", () => {
    expect(isValidGstin("27AAPFU0939F1Z")).toBe(false);
  });
  it("rejects bad pattern", () => {
    expect(isValidGstin("27AAPFU0939F1QV")).toBe(false); // 'Q' where 'Z' expected
  });
  it("rejects wrong checksum", () => {
    expect(isValidGstin("27AAPFU0939F1ZZ")).toBe(false);
  });
  it("rejects empty", () => {
    expect(isValidGstin("")).toBe(false);
  });
  it("is case-insensitive on input", () => {
    expect(isValidGstin("27aapfu0939f1zv")).toBe(true);
  });
});

describe("looksLikeGstin", () => {
  it("passes structural check without checksum", () => {
    expect(looksLikeGstin("27AAPFU0939F1ZZ")).toBe(true);
  });
  it("fails on short input", () => {
    expect(looksLikeGstin("27AAPFU")).toBe(false);
  });
});
