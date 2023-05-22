import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  constructor(private formBuilder:FormBuilder) { }
    frm:FormGroup;
  ngOnInit(): void {
    this.frm=this.formBuilder.group({ //Reactive olarak üzerinde çalışma yapacağımız formu modellemiş olduk. 
      fullName:["", [  //İkinci dizide biz validation larımızı tanımlıyoruz.
       Validators.required,
       Validators.maxLength(50),
       Validators.minLength(3)
      ]], 
      userName:["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email:["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password:["", [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPassword:[""]
    })
  }
  get component(){
    return this.frm.controls;
  }
  onSubmit(data:any){

  }
}
