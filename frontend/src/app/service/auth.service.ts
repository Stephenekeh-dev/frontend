

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  age: number;
  profileImage?: File;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

interface DashboardData {
  firstName: string;
  lastName: string;
  age: number;
  profileImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://springjwt-backend-1.onrender.com';

  constructor(private http: HttpClient) {}

 register(data: RegisterPayload): Observable<any> {
  const formData = new FormData();

  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('username', data.username);
  formData.append('password', data.password);
  formData.append('age', data.age.toString());

  if (data.profileImage) {
    formData.append('profileImage', data.profileImage);
  }

  return this.http.post(`${this.baseUrl}/register`, formData);
}

  login(credentials: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }

  getDashboard(): Observable<DashboardData> {
    return this.http.get<DashboardData>(`${this.baseUrl}/dashboard`);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
