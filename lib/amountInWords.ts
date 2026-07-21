// Convert a rupee amount to Indian-numbering words.
// e.g. 123000 -> "Rupees One Lakh Twenty Three Thousand Only"
//      1234.50 -> "Rupees One Thousand Two Hundred Thirty Four and Fifty Paise Only"

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

/** Words for a number 0..999. */
function twoOrThreeDigits(n: number): string {
  let words = "";
  if (n >= 100) {
    words += ONES[Math.floor(n / 100)] + " Hundred";
    n %= 100;
    if (n > 0) words += " ";
  }
  if (n >= 20) {
    words += TENS[Math.floor(n / 10)];
    if (n % 10 > 0) words += " " + ONES[n % 10];
  } else if (n > 0) {
    words += ONES[n];
  }
  return words;
}

/** Words for the integer (rupee) portion using the Indian grouping. */
function integerToWords(num: number): string {
  if (num === 0) return "Zero";

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const rest = num; // 0..999

  const parts: string[] = [];
  if (crore > 0) parts.push(integerToWords(crore) + " Crore");
  if (lakh > 0) parts.push(twoOrThreeDigits(lakh) + " Lakh");
  if (thousand > 0) parts.push(twoOrThreeDigits(thousand) + " Thousand");
  if (rest > 0) parts.push(twoOrThreeDigits(rest));

  return parts.join(" ");
}

export function amountInWords(amount: number): string {
  if (!isFinite(amount) || amount < 0) return "Rupees Zero Only";

  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  let words = "Rupees " + integerToWords(rupees);
  if (paise > 0) {
    words += " and " + twoOrThreeDigits(paise) + " Paise";
  }
  words += " Only";
  return words;
}
