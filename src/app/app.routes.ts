import { Routes } from '@angular/router';
import { Vitrine } from './paginas/vitrine/vitrine';
import { Cadastro } from './paginas/auth/cadastro/cadastro';
import { Login } from './paginas/auth/login/login';
import { Inicio } from './paginas/inicio/inicio';
import { Dashboard } from './paginas/admin/dashboard/dashboard';
import { EventoForm } from './paginas/admin/evento-form/evento-form';
import { guardGuard } from './core/guards/guard-guard';
import { Contato } from './paginas/contato/contato';

export const routes: Routes = [
    {path:"vitrine", component:Vitrine },
    {path:'inicio', component: Inicio},
    {path: "login", component: Login},
    {path: "cadastro", component: Cadastro},
    {path: "contato", component: Contato},
    {path: "admin", 
        canActivate:[guardGuard],
        children:[
        {path: '', redirectTo:'dashboard', pathMatch: 'full'},
        {path: 'dashboard', component: Dashboard},
        {path: 'create', component: EventoForm},
        {path: 'edit/:id', component: EventoForm}
     ]}
    
];