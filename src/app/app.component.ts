import { Component } from '@angular/core';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';

declare var $:any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerceFrontend';

  constructor(public authService: AuthService, 
    private toastrService: CustomToastrService, 
    private router: Router){
      authService.identityCheck();
  }
  signOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("You have been logged out.", "Logged out.", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }
}


