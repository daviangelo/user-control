import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class HttpUtilService {

  constructor() { }

  headers() {
  	let httpHeaders: HttpHeaders = new HttpHeaders();
    
  	if (localStorage['token']) {
  	  httpHeaders = httpHeaders.set(
  	  	'Authorization', 'Bearer ' + localStorage['token']
      );
     httpHeaders.get("Authorization");
  	}
    
    return { headers: httpHeaders };
  }

  getUserId(): string {
  	if (!localStorage['token']) {
  	  return '';
  	}
  	const userData = this.getUserData();
  	return userData ? userData.id : '';
  }

  getUserData() {
    if (!localStorage['token']) {
      return '';
    }
    return JSON.parse(atob(localStorage['token'].split('.')[1]));
  }

  getRole(): string {
    if (!localStorage['token']) {
      return '';
    }
    const userData = this.getUserData();
    return userData ? userData.role : '';
  }  
	
}