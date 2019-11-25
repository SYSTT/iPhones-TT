const TRADE_MARGIN = 1000;

const getCashDifference = (orderItemCost: number, tradeItemPrice: number) => {
  return orderItemCost + TRADE_MARGIN - tradeItemPrice;
};

export default getCashDifference;
