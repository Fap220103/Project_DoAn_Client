export const PriceFields = [
  { name: 'originalPrice', label: 'Product.OriginalPrice' },
  { name: 'price', label: 'Product.Price' },
  { name: 'salePercent', label: 'Product.SalePercent' }
];

export const optionsCheckbox = [{ name: 'isActive', label: 'Hiển thị' }];

export const orderStatus = [
  {
    id: '1',
    display: 'Chờ xác nhận'
  },
  {
    id: '2',
    display: 'Đang giao hàng'
  },
  {
    id: '3',
    display: 'Đã giao hàng'
  },
  {
    id: '4',
    display: 'Đã hủy'
  }
];
export const statusPayment = [
  {
    id: '1',
    display: 'Chưa thanh toán'
  },
  {
    id: '2',
    display: 'Đã thanh toán'
  },
  {
    id: '3',
    display: 'Hoàn tiền'
  }
];
export const discountType = [
  { value: '0', display: '%' },
  { value: '1', display: 'VND' }
];

export const paymentType = [
  { value: '1', display: 'COD' },
  { value: '2', display: 'VNPAY' }
];
