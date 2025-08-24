export const getNumericValue = (valueStr) => {
  if (!valueStr) return 0;
  if (valueStr.endsWith('K')) return parseFloat(valueStr.replace('K', '')) * 1000;
  if (valueStr.endsWith('M')) return parseFloat(valueStr.replace('M', '')) * 1000000;
  if (valueStr.endsWith('%')) return parseFloat(valueStr.replace('%', ''));
  return parseFloat(valueStr) || 0;
};

