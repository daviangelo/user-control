import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  roles: Role[] = [
    { value: 'ROLE_ADMIN', viewValue: 'Administrador'},
    { value: 'ROLE_USER', viewValue: 'Usuário' }
  ];


  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserById(this.route.snapshot.params['id']);
  }

  generateForm(user: User) {
    this.userForm = this.fb.group({
      name: [user.name, [Validators.required, Validators.minLength(3)]],
      email: [user.email, [Validators.required, Validators.email]],
      cpf: [user.cpf, [Validators.required, CpfValidator]],
      telephone: [user.telephone, [Validators.required, Validators.minLength(3)]],
      password: [user.password, [Validators.required, Validators.minLength(6)]],
      role: [user.role, [Validators.required]]
    });
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe(
      data =>{
       let user = data['data'] as User;
        this.generateForm(user);
      },
      err =>{
        console.log(err);
        this.snackBar.open('Erro ao carregar usuário.', 'Erro', { duration: 5000 });
      }
    );

  }

  addUser() {
    if (this.userForm.invalid) {
      return;
    }

    const user: User = this.userForm.value;
    user.id = this.route.snapshot.params['id'];

    this.userService.updateUser(user)
      .subscribe(
        data => {
          alert("Dados do Usuário atualizados com sucesso!")
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
