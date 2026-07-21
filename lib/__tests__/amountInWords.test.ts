import { describe, it, expect } from "vitest";
import { amountInWords } from "../amountInWords";

describe("amountInWords — Indian numbering", () => {
  it("handles the brief's example", () => {
    expect(amountInWords(123000)).toBe(
      "Rupees One Lakh Twenty Three Thousand Only"
    );
  });
  it("zero", () => {
    expect(amountInWords(0)).toBe("Rupees Zero Only");
  });
  it("simple hundreds", () => {
    expect(amountInWords(500)).toBe("Rupees Five Hundred Only");
  });
  it("teens", () => {
    expect(amountInWords(1180)).toBe(
      "Rupees One Thousand One Hundred Eighty Only"
    );
  });
  it("lakhs and thousands", () => {
    expect(amountInWords(123456)).toBe(
      "Rupees One Lakh Twenty Three Thousand Four Hundred Fifty Six Only"
    );
  });
  it("crores", () => {
    expect(amountInWords(10000000)).toBe("Rupees One Crore Only");
  });
  it("full mixed value", () => {
    expect(amountInWords(12345678)).toBe(
      "Rupees One Crore Twenty Three Lakh Forty Five Thousand Six Hundred Seventy Eight Only"
    );
  });
  it("paise", () => {
    expect(amountInWords(1234.5)).toBe(
      "Rupees One Thousand Two Hundred Thirty Four and Fifty Paise Only"
    );
  });
  it("negative / invalid guards to zero", () => {
    expect(amountInWords(-5)).toBe("Rupees Zero Only");
  });
});
