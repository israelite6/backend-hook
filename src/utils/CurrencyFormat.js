export default function currencyFormat(amount) {
  try {
    return amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  } catch (e) {
    return "0.00";
  }
}
