export function cn(...classes) {
  return classes.flat().filter(Boolean).join(" ");
}

export const formatPrice = (price) => {
  const formattedNumber = new Intl.NumberFormat("en-GB", {
    maximumFractionDigits: 0,
  }).format(price);

  return `${formattedNumber} £`;
};
