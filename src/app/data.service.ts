import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Customer } from './interfaces/customer';
@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  get requestOption() {
    const _headers = new HttpHeaders().set('Content-Type', 'application/json');
    return { headers: _headers };
  }

  getCustomers() {
    return this.http.get(this.baseUrl + `/customers`, this.requestOption);
  }
  create(body: any) {
    return this.http.post(
      this.baseUrl + `/customers`,
      body,
      this.requestOption,
    );
  }
}
