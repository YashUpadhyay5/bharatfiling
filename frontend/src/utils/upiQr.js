import QRCode from 'qrcode';

/**
 * Builds the standard NPCI UPI Intent URI for scan-to-pay
 * @param {Object} options
 * @param {string} options.payeeVpa - Payee VPA / UPI ID (e.g., bharatfilings@hdfcbank)
 * @param {string} options.payeeName - Payee Display Name
 * @param {number|string} options.amount - Exact transaction amount (e.g., 1769.00)
 * @param {string} options.transactionNote - Transaction purpose / note
 * @param {string} options.referenceId - Order / Quotation Reference
 * @returns {string} upi://pay?...
 */
export function buildUpiIntentUri({
  payeeVpa = 'bharatfilings@hdfcbank',
  payeeName = 'BharatFiling Pvt Ltd',
  amount = 1769,
  transactionNote = 'GST Registration Fee',
  referenceId = '',
}) {
  const formattedAmount = Number(amount).toFixed(2);
  const note = referenceId ? `${transactionNote} Ref:${referenceId}` : transactionNote;

  const params = new URLSearchParams({
    pa: payeeVpa,
    pn: payeeName,
    am: formattedAmount,
    cu: 'INR',
    tn: note,
  });

  return `upi://pay?${params.toString()}`;
}

/**
 * Generates an SVG or high-resolution Data URL for the given UPI URI
 * @param {string} upiUri
 * @param {number} size
 * @returns {Promise<string>} Data URL
 */
export async function generateUpiQrDataUrl(upiUri, size = 260) {
  try {
    const dataUrl = await QRCode.toDataURL(upiUri, {
      width: size,
      margin: 1,
      color: {
        dark: '#111827', // BharatFiling Slate Charcoal dots
        light: '#FFFFFF', // Pure white background
      },
      errorCorrectionLevel: 'M',
    });
    return dataUrl;
  } catch (err) {
    console.error('Error generating UPI QR code:', err);
    return null;
  }
}
