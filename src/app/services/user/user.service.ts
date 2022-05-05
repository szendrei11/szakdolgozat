import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  createNewUser(payload: any) {
    return this.http.post(`${environment.baseURL}user/register`, payload);
  }
  userLogin(payload: any) {
    return this.http.post(`${environment.baseURL}user/login`, payload);
  }
  getProtectedData() {
    return this.http.get(`${environment.baseURL}user/data`);
  }
  constructor(private http: HttpClient) {}
}
