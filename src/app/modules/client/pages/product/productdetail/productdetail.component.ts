import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../../core/services/product.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { ProductVariantService } from '../../../../../core/services/productvariant.service';
import { CartService } from '../../../../../core/services/cart.service';
import { ActivatedRoute } from '@angular/router';

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
  productId!: string;
  quantity = 1;
  lstColor: any[] = [];
  lstSize: any[] = [];
  selectedColorIndex: number = 0;
  selectedSizeIndex: number = 0;

  constructor(
    private productService: ProductService,
    private variantService: ProductVariantService,
    private cartService: CartService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    this.currentUserId = authService.getUserId();
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.productId = params.get('id')!;
    });
    this.getData();
    this.fetchProductData();
    this.addViewCount();
  }
  addViewCount() {
    const addItem = {
      productId: this.productId
    };
    this.productService.addViewCount(addItem).subscribe((rs) => {});
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
            productName: this.item.title,
            sizeName: size.name,
            colorName: color.name,
            quantity: this.quantity,
            image: this.selectedImage,
            price: price,
            totalPrice: price * this.quantity
          };

          this.cartService.addToCart(cartItem, this.quantity).subscribe(
            () => {
              this.snackBar.open('Đã thêm sản phẩm vào giỏ hàng', 'Đóng', { duration: 3000 });
            },
            (error) => {
              this.snackBar.open('Có lỗi khi thêm sản phẩm vào giỏ hàng', 'Đóng', {
                duration: 3000
              });
              console.error('Error adding product to cart:', error);
            }
          );
        });
      },
      error: () => {
        this.snackBar.open('Không tìm thấy biến thể sản phẩm', 'Đóng', { duration: 3000 });
      }
    });
  }
}
