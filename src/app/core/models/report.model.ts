export interface RevenueDto {
  date: string;
  doanhThu: number;
  loiNhuan: number;
}

export interface BestSellingProduct {
  productName: string;
  quantitySold: number;
}

export interface BestBadProduct {
  productName: string;
  negativePercent: number;
}
