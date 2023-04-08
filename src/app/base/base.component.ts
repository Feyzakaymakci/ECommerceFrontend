import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(spinnerNameType:SpinnerType){
    this.spinner.show(spinnerNameType);

   //setTimeout(() => this.hideSpinner(spinnerNameType), 1000); //Kaç sn duracağı
    } 
  
  hideSpinner(spinnerNameType:SpinnerType){ //seçilen spinner ın kapatılması için 
    this.spinner.hide(spinnerNameType);
  }
  
}

export enum SpinnerType{
  BallAtom="s1",
  ballSpinFadeRotating="s2",
  ballScaleMultiple="s3",
}
