import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model'
import { UserService } from '../../services/user.service';
import { CpfValidator } from '../../../shared/cpf.validator'
import { MatSnackBar } from '@angular/material';


export interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  roles: Role[] = [
    { value: 'ROLE_ADMIN', viewValue: 'Administrador'},
    { value: 'ROLE_USER', viewValue: 'Usuário' }
  ];

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.generateForm();
  }

  generateForm() {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      cpf: ['', [Validators.required, CpfValidator]],
      telephone: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', [Validators.required]]
    });

  }

  addUser() {
    if (this.userForm.invalid) {
      return;
    }

    const user: User = this.userForm.value;
    this.userService.registerUser(user)
      .subscribe(
        data => {
          alert("Usuário Cadastrado com Sucesso!")
          this.router.navigate(['/user']);
        },
        err => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      );
  }

}
