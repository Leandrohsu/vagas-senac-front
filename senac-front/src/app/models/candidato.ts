import { Usuario } from "../components/auth/usuario";
import { Endereco } from "./endereco";

export class Candidato {
    id!: number;
    nome!: string;
    cpf!: string;
    dataNascimento!: string;

    enderecos!: Endereco[];

     usuario!: Usuario;
    
}
