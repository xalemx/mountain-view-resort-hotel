// One way of writing a euro amount, so the accommodation tables and the
// restaurant menu read the same way.
//
// The number of decimals is passed in by each table: the nightly prices the
// owner gave are whole euros, the menu prices carry cents, and rounding either
// one would change the figure a guest reads.
export const EURO = "€";

export function formatEuro(amount, decimals = 2) {
  return `${EURO}${Number(amount).toFixed(decimals)}`;
}