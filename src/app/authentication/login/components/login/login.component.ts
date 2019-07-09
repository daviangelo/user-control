import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import { Login } from '../../models/login.model';
import { LoginService } from '../../services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  logon() {
    if (this.form.invalid) {
      return;
    }

    const login: Login = this.form.value;

    this.loginService.logon(login).subscribe(
      data => {
        localStorage['token'] = data['data']['token'];

        const userData = JSON.parse(atob(data['data']['token'].split('.')[1]));

        localStorage['email'] = userData['sub'];
        localStorage['role'] = userData['role']

        switch (localStorage['role']) {
          case 'ROLE_ADMIN':
            this.router.navigate(['/user']);
            break;
          case 'ROLE_USER':
             this.router.navigate(['/user-list']);
            
            break;
          default:
        }
      },
      err => {
        let msg: string = "Tente novamente em instantes."

        if (err['status'] == 401) {
          msg = "Email ou senha inválido(s).";
        }
        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    );

  }






}
