import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsersComponent } from './components/users/users.component'
import { UserNewComponent } from './components/user-new/user-new.component'
import { UserEditComponent } from './components/user-edit/user-edit.component'
import { UserComponent } from './components/user.component';
import { AdminGuard } from './services/admin-guard.service';

export const UserRoutes: Routes = [
    {
        path: 'user', 
        redirectTo: 'user/users', 
        canActivate: [ AdminGuard ],
        pathMatch: 'full' 
    },
    {
        path: 'user',
        component: UserComponent,
        canActivate: [ AdminGuard ],
        children: [
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [ AdminGuard ],
                data: { title: 'Lista de Usuários' }
            },
            {
                path: 'user-new',
                component: UserNewComponent,
                canActivate: [ AdminGuard ],
                data: { title: 'Cadastrar Usuário' }
            },
            {
                path: 'user-edit/:id',
                canActivate: [ AdminGuard ],
                component: UserEditComponent,
                data: { title: 'Editar o Produto' }
            }
        ]
    },
    {
        path: 'user-list',
        component: UsersComponent,
        data: { tile: 'Lista de Usuários'}
    }
]

@NgModule({
    imports: [ RouterModule.forChild(UserRoutes) ],
    exports: [ RouterModule ]
  })

export class UserRoutingModule {

}
