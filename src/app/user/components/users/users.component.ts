import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'telephone', 'cpf', 'role', 'action-edit', 'action-delete'];
  dataSource: User[];
  isLoadingResults = true;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.listUsers();
  }

  listUsers() {
    this.userService.listUsers().subscribe(
      data => {
        this.dataSource = data['data'] as User[];
        this.isLoadingResults = false;
      },
      err => {
        console.log(err);
        this.snackBar.open('Erro ao carregar usuários.', 'Erro', { duration: 5000 });
        this.isLoadingResults = false;
      }

    );

  }

  isNotActualUser(email: string): boolean {
    return email != localStorage['email'];
  }

  isAdmin(){
    return localStorage['role'].includes('ADMIN');
  }

  removeUser(name: string,  id: number) {

    if (confirm('Deseja excluir o usuário '+ name +'?')){
      this.userService.deleteUser(id).subscribe(
        data => {
          location.reload();
        },
        err => {
          console.log(err);
          this.snackBar.open('Erro excluir o usuário '+ name, "Erro", { duration: 5000 });
        }
      ); 
    }
  }

}
