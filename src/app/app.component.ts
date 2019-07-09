import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Controle de Usuários'

  constructor(private router: Router) { }

  ngOnInit() {
  }

  exit() {
  	delete localStorage['token'];
  	this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return localStorage['token'];
  }



}
