import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from '../../../environments/environment';
import { HttpUtilService } from './http-util.service';


import { User } from '../models/user.model';

@Injectable()
export class UserService {
  
  private readonly PATH: string = env.baseApiUrl + 'users/';
  private readonly DELETE: string = this.PATH + 'delete/{id}';
  private readonly POST: string = this.PATH + 'register/';
  private readonly PUT: string = this.PATH + 'update/{id}';

  constructor(
    private http: HttpClient,
    private httpUtil: HttpUtilService
  ) { }

  listUsers(): Observable<any> {
    return this.http.get(this.PATH, this.httpUtil.headers());
  }

  getUserById(id: number):Observable<any> {
    return this.http.get(this.PATH + id.toString(), this.httpUtil.headers());
  }

  registerUser(user: User): Observable<any> {
    return this.http.post(
      this.POST, 
      user, 
      this.httpUtil.headers());
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(
      this.DELETE.replace('{id}', id.toString()),
      this.httpUtil.headers()
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(
      this.PUT.replace('{id}', user.id.toString()),
      user, 
      this.httpUtil.headers()
    );
  }

}
