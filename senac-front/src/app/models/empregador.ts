import { Endereco } from "./endereco";

export class Empregador {
    id!: number;
    nome!: string;
    razaoSocial!: string;
    nomeFantasia!: string;
    cnpj!: string;

    enderecos!: Endereco[];
    
    
}
