import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, Observable, of, throwError } from 'rxjs';
import { RouteConfigLoadEnd, Router } from '@angular/router';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer ' + authToken,
      },
    });
    /*  if (!authToken) {
      this.authService.doLogout();
      return next.handle(req);
    } else {
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + authToken,
        },
      });
      return next.handle(req);
    }*/
    return next.handle(req); /*.pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status)) {
          localStorage.removeItem('access_token');
          this.router.navigate(['/home']);
        }
        const error = (err && err.error && err.error.message) || err.statusText;
        console.error(err);
        return of(error);
      })
    );*/
  }
}
