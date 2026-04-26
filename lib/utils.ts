export const formatPrice = (price: number | string) => {
  const num = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, "")) : price;
  if (isNaN(num)) return price;
  return new Intl.NumberFormat('en-GH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};
