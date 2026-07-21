// GSTIN validation.
// Format: 15 chars — 2-digit state code, 10-char PAN, 1 entity digit,
// a fixed 'Z', and a checksum char. We validate the structural pattern and
// the checksum digit (mod-36 algorithm published by GSTN).

const GSTIN_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

const CODE_POINT_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function checksumChar(gstin14: string): string {
  const factorAlternates = [1, 2];
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const codePoint = CODE_POINT_CHARS.indexOf(gstin14[i]);
    const factor = factorAlternates[i % 2];
    const product = codePoint * factor;
    // "digit sum" in base 36: quotient + remainder
    const quotient = Math.floor(product / 36);
    const remainder = product % 36;
    sum += quotient + remainder;
  }
  const checkCodePoint = (36 - (sum % 36)) % 36;
  return CODE_POINT_CHARS[checkCodePoint];
}

export function isValidGstin(value: string): boolean {
  if (!value) return false;
  const gstin = value.trim().toUpperCase();
  if (gstin.length !== 15) return false;
  if (!GSTIN_REGEX.test(gstin)) return false;
  return checksumChar(gstin.slice(0, 14)) === gstin[14];
}

/** Structural check only (length + pattern), ignoring the checksum. Used for
 * softer, non-blocking hints while the user is still typing. */
export function looksLikeGstin(value: string): boolean {
  if (!value) return false;
  const gstin = value.trim().toUpperCase();
  return gstin.length === 15 && GSTIN_REGEX.test(gstin);
}
