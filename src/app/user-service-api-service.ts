import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserResponse } from './interface/user';
import { SingleUserResponse } from './interface/curr';

@Injectable({
  providedIn: 'root',
})
export class UserServiceApiService {
  constructor(private http: HttpClient) {}

  privatUrl = 'http://localhost:4000/api/v1/socket';

  signup(data: any) {
    return this.http.post(`${this.privatUrl}/signup`, data);
  }

  login(data: any) {
    return this.http.post(`${this.privatUrl}/login`, data, {
      withCredentials: true,
    });
  }

  OTP(data: any) {
    return this.http.post(`${this.privatUrl}/verify-otp`, data);
  }

  users() {
    return this.http.get<UserResponse>(`${this.privatUrl}/users`, {
      withCredentials: true,
    });
  }

  currentuser() {
    return this.http.get<SingleUserResponse>(`${this.privatUrl}/single-user`, {
      withCredentials: true,
    });
  }

  logoutuser() {
    return this.http.post(
      `${this.privatUrl}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }
}
