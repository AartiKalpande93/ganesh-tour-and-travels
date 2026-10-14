export const getEmiDetails = (price) => {
  if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) {
    return null;
  }

  const installments = price < 50000 ? 3 : 6;
  const monthlyAmount = Math.round(price / installments);

  return {
    installments,
    monthlyAmount,
    formattedMonthlyAmount: `₹${monthlyAmount.toLocaleString("en-IN")}`,
  };
};
