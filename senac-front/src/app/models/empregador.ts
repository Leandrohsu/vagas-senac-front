import { Usuario } from "../components/auth/usuario";
import { Endereco } from "./endereco";

export class Empregador {
    id!: number;
    nome!: string;
    razaoSocial!: string;
    nomeFantasia!: string;
    cnpj!: string;

    enderecos!: Endereco[];
    
    usuario!: Usuario;
}
