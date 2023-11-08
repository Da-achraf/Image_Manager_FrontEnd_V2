import {inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthorizationTokenInterceptor implements HttpInterceptor {

  authService = inject(AuthService)
  router = inject(Router)
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Add Authorization Token To Requests Headers
    request = request.clone({
      setHeaders: { Authorization: `${this.authService.getToken()}` }
    });
    return next.handle(request);

  }
}
