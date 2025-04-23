import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../core/services/product.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ProductVariantService } from '../../../../../core/services/productvariant.service';
import { CartService } from '../../../../../core/services/cart.service';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  selectedImage: string = '';
  activeTab = 'tab_1';
  item: any;
  params: any = {};
  currentUserId!: string;
  productId: string = 'c4acfdb0-09ec-4c2e-afbb-b2c800af2336';
  reviewCount = 3;
  quantity = 1;
  lstColor: any[] = [];
  lstSize: any[] = [];
  selectedColorIndex: number = 1;
  selectedSizeIndex: number = 1;

  constructor(
    private productService: ProductService,
    private variantService: ProductVariantService,
    private cartService: CartService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private translate: TranslateService
  ) {
    this.currentUserId = authService.getUserId();
  }
  ngOnInit(): void {
    this.getData();
    this.fetchProductData();
  }
  fetchProductData(): void {
    this.variantService.getCZByProductId(this.productId).subscribe((rs) => {
      this.lstColor = rs.content.color;
      this.lstSize = rs.content.size;
    });
  }
  getData() {
    this.productService.getProductById(this.productId).subscribe((rs) => {
      this.item = rs.content.data;
      const defaultImg = this.item.productImage.find((x: any) => x.isDefault);
      this.selectedImage = defaultImg ? defaultImg.image : this.item.productImage[0]?.image;
    });
  }
  minusQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }
  addQuantity() {
    this.quantity++;
  }
  selectColor(index: number): void {
    this.selectedColorIndex = index;
  }

  selectSize(index: number): void {
    this.selectedSizeIndex = index;
  }

  addToCart(): void {
    const color = this.lstColor[this.selectedColorIndex];
    const size = this.lstSize[this.selectedSizeIndex];
    if (!color || !size || !this.item) {
      this.snackBar.open('Vui lòng chọn đầy đủ màu sắc và kích cỡ', 'Đóng', { duration: 3000 });
      return;
    }
    this.variantService.getProductVariantId(this.productId, color.id, size.id).subscribe({
      next: (res) => {
        const variantId = res.content.data;

        // Bước kiểm tra số lượng tồn kho
        this.variantService.getStock(variantId).subscribe((stockRes) => {
          const availableStock = stockRes.content.data;

          if (this.quantity > availableStock) {
            this.snackBar.open('Số lượng bạn chọn vượt quá tồn kho', 'Đóng', { duration: 3000 });
            return;
          }

          const price = this.item.salePercent > 0 ? this.item.priceSale : this.item.price;
          const cartItem = {
            productVariantId: variantId,
            productId: this.item.id,
            colorId: color.id,
            sizeId: size.id,
            productName: this.item.title,
            sizeName: size.name,
            colorName: color.name,
            quantity: this.quantity,
            image: this.item.image,
            price: price,
            totalPrice: price * this.quantity
          };

          this.cartService.addToCart(cartItem, this.quantity);
          this.snackBar.open('Đã thêm sản phẩm vào giỏ hàng', 'Đóng', { duration: 3000 });
        });
      },
      error: () => {
        this.snackBar.open('Không tìm thấy biến thể sản phẩm', 'Đóng', { duration: 3000 });
      }
    });
  }
}
