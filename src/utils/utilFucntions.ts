export function maskCreditCardNumber(creditCardNumber: string): string {
  // Check if the input is a valid credit card number (you might want to adjust this validation)
  if (!/^\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}$/.test(creditCardNumber)) {
    throw new Error('Invalid credit card number format');
  }

  // Remove any non-digit characters and keep only the last four digits
  const lastFourDigits = creditCardNumber.replace(/\D/g, '').slice(-4);

  // Mask the rest of the digits with asterisks
  const maskedPart = '•'.repeat(creditCardNumber.length - 4);

  // Concatenate the masked part with the last four digits
  return maskedPart + lastFourDigits;
}

// Example usage:
//   const creditCardNumber = '1234-5678-9012-3456';
//   const maskedNumber = maskCreditCardNumber(creditCardNumber);
//   console.log(maskedNumber);

export function parseFileSize(sizeString: string) {
  const strippedString = sizeString.replace(/mb/i, '').trim();

  const size = parseFloat(strippedString);

  return size;
}

export function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  // Array of month names
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Get the month name
  const month = months[date.getMonth()];

  // Get the day with appropriate suffix (1st, 2nd, 3rd, etc.)
  const day = date.getDate();
  const daySuffix =
    day % 10 == 1 && day != 11
      ? 'st'
      : day % 10 == 2 && day != 12
      ? 'nd'
      : day % 10 == 3 && day != 13
      ? 'rd'
      : 'th';
  const formattedDay = day + daySuffix;

  // Get the year
  const year = date.getFullYear();

  // Construct the formatted date string
  const formattedDate = `${month}, ${formattedDay}, ${year}`;

  return formattedDate;
}

// // Example usage
// const formattedDate = formatDate("2024-02-21T17:13:16.756Z");
// console.log(formattedDate); // Output: February, 21st, 2024

export function roundToNearestDecimal(num: any): number {
  const roundedTenths = Math.round(num * 10);
  return roundedTenths / 10;
}
