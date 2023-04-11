import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from '../../../dialogs/dialog.module';


@NgModule({
  declarations: [
    FileUploadComponent,

  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    DialogModule,
  ],
  exports:[  //Bu işlem selector üzerinden kullanabilmemiz için gerekli.
    FileUploadComponent
  ]
})
export class FileUploadModule { }


