import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';
import { BaseDialog } from '../base/base-dialog';
import { ProductService } from 'src/app/services/common/models/product.service';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss']
})
export class SelectProductImageDialogComponent extends BaseDialog<SelectProductImageDialogComponent> {

  constructor(dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,  //MAT_DIALOG_DATA:Dialog penceresiyle o anda o dialog penceresinin kullanıldığı component arasında veri alışverişi sürecinde kullanacağımız datayı bu parametre tanımlıyor.
    private productService:ProductService,
    private spinner:NgxSpinnerService ) {
    super(dialogRef)
  }
  
  @Output() options: Partial<FileUploadOptions> = { //Dışarıya değer gönderen bir değişken old için output kullandık
    accept: ".png, .jpg, .jpeg, .gif",
    action: "upload",
    controller: "products",
    explanation: "Ürün resimini seçin veya buraya sürükleyin...",
    isAdminPage: true,
    queryString: `id=${this.data}`
  };

  images:List_Product_Image[];
  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom);
    this.images= await this.productService.readImages(this.data as string, ()=>this.spinner.hide(SpinnerType.BallAtom));
  }
}


export enum SelectProductImageState {
  Close
}