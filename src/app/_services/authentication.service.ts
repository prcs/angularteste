import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Constants } from '../app.constants';

@Injectable()
export class AuthenticationService {

    private url;

    constructor(private http: Http) {
        this.url = `${Constants.API_URL}login/`;
    }

    login(username: string, password: string) {
        return this.http.post(this.url, JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json().user;
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}