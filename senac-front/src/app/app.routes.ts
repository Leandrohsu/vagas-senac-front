import { Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { CandidatosFormComponent } from './components/candidatos/candidatos-form/candidatos-form.component';
import { CandidatosListComponent } from './components/candidatos/candidatos-list/candidatos-list.component';
import { ContatosListComponent } from './components/contatos/contatos-list/contatos-list.component';
import { ContatosFormComponent } from './components/contatos/contatos-form/contatos-form.component';
import { EmpregadoresListComponent } from './components/empregadores/empregadores-list/empregadores-list.component';
import { EmpregadoresFormComponent } from './components/empregadores/empregadores-form/empregadores-form.component';
import { EnderecosListComponent } from './components/enderecos/enderecos-list/enderecos-list.component';
import { EnderecosFormComponent } from './components/enderecos/enderecos-form/enderecos-form.component';
import { VagasListComponent } from './components/vagas/vagas-list/vagas-list.component';
import { VagasFormComponent } from './components/vagas/vagas-form/vagas-form.component';

export const routes: Routes = [
    {path: "", redirectTo: "vagas", pathMatch: 'full'},
    {path: "vagas", component: VagasListComponent},
    {path: "admin", component: PrincipalComponent,children:[
        {path: "candidato", component: CandidatosListComponent},
        {path: "candidato/new", component: CandidatosFormComponent},
        {path: "candidato/edit/:id", component: CandidatosFormComponent},
        {path: "contato", component: ContatosListComponent},
        {path: "contato/new", component: ContatosFormComponent},
        {path: "contato/edit/:id", component: ContatosFormComponent},
        {path: "empregador", component: EmpregadoresListComponent},
        {path: "empregador/new", component: EmpregadoresFormComponent},
        {path: "empregador/edit/:id", component: EmpregadoresFormComponent},
        {path: "endereco", component: EnderecosListComponent},
        {path: "endereco/new", component: EnderecosFormComponent},
        {path: "endereco/edit/:id", component: EnderecosListComponent},
        {path: "vagas", component: VagasListComponent},
        {path: "vagas/new", component: VagasFormComponent},
        {path: "vagas/edit/:id", component: VagasFormComponent}
    ]}

];
