// Utility function to conditionally join class names
export function cn(...classes) {
  return classes
    .flat() // Flatten nested arrays
    .filter(Boolean) // Remove falsy values (false, null, undefined, "")
    .join(" "); // Join remaining classes with space
}

// Utility function to format a number as a price in GBP
export const formatPrice = (price) => {
  const formattedNumber = new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0, // No decimal places
  }).format(price); // Format number according to en-GB locale

  return `${formattedNumber} £`; // Append currency symbol at the end
};
