// Generate a UPI payment QR as a PNG data URL (client-side).
// Kept separate so both the preview and the PDF can share one generated image.

import QRCode from "qrcode";

export async function generateQrDataUrl(text: string): Promise<string> {
  return QRCode.toDataURL(text, {
    errorCorrectionLevel: "M",
    margin: 1,
    width: 240,
    color: { dark: "#04342C", light: "#FFFFFF" },
  });
}
