import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt'
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { _isAuthenticated } from 'src/app/services/common/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private jwtHelper: JwtHelperService, 
    private router: Router, 
    private toastrService: CustomToastrService, 
    private spinner: NgxSpinnerService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.spinner.show(SpinnerType.BallAtom);
    const token: string = localStorage.getItem("accessToken");

    let expired: boolean;
    try {
      expired = this.jwtHelper.isTokenExpired(token);
    } catch {
      expired = true;
    }

    if (!_isAuthenticated) { //token yoksa veya expire edilmişse
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastrService.message("You have to login.", "Unauthorized access."




      , {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })
    }


    this.spinner.hide(SpinnerType.BallAtom);

    return true;
  }

}