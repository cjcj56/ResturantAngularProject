import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.authService.userSubject.pipe(take(1), exhaustMap(user => {
            if (!user) {
                return next.handle(req);
            }
            const newReq = req.clone({params: new HttpParams().set('auth', user.token)});
            return next.handle(newReq);
        }));
    }
}
