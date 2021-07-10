import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AuthenticationService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        //const currentUser = this.authenticationService.currentUser;
        //const isLoggedIn = currentUser;
        const isApiUrl = request.url.startsWith(environment.apiUrl);
        if ( isApiUrl && localStorage.getItem('token')) {
            request = request.clone({
                setHeaders: {
                    Authorization: localStorage.getItem('token')
                }
            });
        }

        return next.handle(request);
    }
}