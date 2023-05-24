import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit{

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService, spinner: NgxSpinnerService) {
    super(spinner)
  }
    frm:FormGroup;

  ngOnInit(): void {

    this.frm=this.formBuilder.group({ //Reactive olarak üzerinde çalışma yapacağımız formu modellemiş olduk. 
      fullName:["", [  //İkinci dizide validation larımızı tanımlıyoruz.
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
      confirmPassword:["", [
        Validators.required,
        Validators.minLength(6)
      ]]
    },{
      validators:(group:AbstractControl):ValidationErrors | null=>{
        let password =group.get("password").value;
        let confirmPassword=group.get("confirmPassword").value;
        return password===confirmPassword ? null:{notSame:true};
      }
    })
    }
  
  get component(){
    return this.frm.controls;
  }
  submitted:boolean=false;
  async onSubmit(user:User){
    this.submitted=true;
    

    if(this.frm.invalid)
    return;
    const result: Create_User = await this.userService.create(user);
    if (result.succeeded)
    {
      this.toastrService.message(result.message, "User registration successful", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      })}
    else
      this.toastrService.message(result.message, "Error", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      })
    }
}
