import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { datastorageInfo } from '../app-data';
import { User } from './user.model';


export interface AuthSignResponse {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

const firebaseErrorCodesToMessages = {
    EMAIL_EXISTS: 'The email address is already in use by another account.',
    OPERATION_NOT_ALLOWED: 'Password sign-in is disabled for this project.',
    TOO_MANY_ATTEMPTS_TRY_LATER: 'We have blocked all requests from this device due to unusual activity. Try again later.',
    EMAIL_NOT_FOUND: 'There is no user record corresponding to this identifier. The user may have been deleted.',
    INVALID_PASSWORD: 'The password is invalid or the user does not have a password.',
    USER_DISABLED: 'The user account has been disabled by an administrator.'
};

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {}

    userSubject = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any = null;

    sign(email: string, password: string, url: string) {
        return this.http.post<AuthSignResponse>(url, {
            email,
            password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(response => {
            this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn);
        }));
    }

    signup(email: string, password: string) {
        return this.sign(email, password, datastorageInfo.auth.signupUrl + datastorageInfo.settings.apikey);
    }

    signin(email: string, password: string) {
        return this.sign(email, password, datastorageInfo.auth.signinUrl + datastorageInfo.settings.apikey);
    }

    signout() {
        this.userSubject.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoSignin() {
        const userData: {
            email: string;
            password: string;
            _token: string;
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const user = new User(userData.email, userData.password, userData._token, new Date(userData._tokenExpirationDate));
        if (user.token) {
            this.userSubject.next(user);
            const expiresIn = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoSignout(expiresIn);
        }
    }

    autoSignout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => { this.signout(); }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.userSubject.next(user);
        this.autoSignout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        if (errorResponse.error && errorResponse.error.error) {
            const firebaseErrorCode = errorResponse.error.error.message;
            if (firebaseErrorCode in firebaseErrorCodesToMessages) {
                return throwError(firebaseErrorCodesToMessages[firebaseErrorCode]);
            } else {
                return throwError('Unknown error occurred! (Firebase error code: \'' + firebaseErrorCode + '\')');
            }
        } else {
            return throwError('Unknown error occurred!');
        }
    }
}
