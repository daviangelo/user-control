import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LogonComponent } from './components/logon.component';
import { LoginComponent } from './components/login/login.component';

export const LoginRoutes: Routes = [
	{
		path: 'login',
		component: LogonComponent,
		children: [{ path: '', component: LoginComponent }]
	}
];

@NgModule({
    imports: [ RouterModule.forChild(LoginRoutes) ],
    exports: [ RouterModule ]
  })

export class LoginRoutingModule {
}
