export interface Color {
  id: string;
  colorName: string;
  colorCode: string;
}

export interface ColorResult {
  data: Color[];
  message: string;
}
