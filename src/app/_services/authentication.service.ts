import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationRequest } from '../_models/authentication_request';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
currentUser={};

  constructor(private http: HttpClient) { }


    login(authenticationRequest : AuthenticationRequest) {  
        return this.http.post<any>(`${environment.apiUrl}/login`, authenticationRequest
        ,{observe: 'response'})
            .pipe(map(res => {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
                // login successful if there's a jwt token in the response
                console.log('res',res)
                if (res.headers.get("Authorization")) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                   localStorage.setItem('token', res.headers.get("Authorization"));
                   this.currentUser = res;                    
                }
                console.log('res',res.headers.get("Authorization"))
                
                return res;
                 
            }));
    }
    
    
  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('token');
    return (authToken !== null) ? true : false;
  }
 

    logout(){
        localStorage.removeItem('token')
    }


}