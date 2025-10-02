// Currency formatting utilities

export const formatCurrency = (amount, currency = 'INR') => {
  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatPrice = (price) => {
  return formatCurrency(price, 'INR');
};

export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice || originalPrice <= salePrice) {
    return 0;
  }
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

export const convertUSDToINR = (usdAmount, exchangeRate = 83) => {
  return Math.round(usdAmount * exchangeRate);
};

export const convertINRToUSD = (inrAmount, exchangeRate = 83) => {
  return Math.round((inrAmount / exchangeRate) * 100) / 100;
};