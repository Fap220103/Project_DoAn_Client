export function calculateDiscount(price: number, discount: number): number {
  if (discount < 0 || discount > 100) {
    throw new Error('Tỉ lệ giảm giá không hợp lệ');
  }
  return price - (price * discount) / 100;
}
