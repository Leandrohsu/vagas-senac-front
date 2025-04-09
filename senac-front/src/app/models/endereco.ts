import { Candidato } from "./candidato";
import { Empregador } from "./empregador";
import { Vagas } from "./vagas";

export class Endereco {
    id!: number;
    rua!: string;
    estado!: string;
    cidade!: string;
    cep!: string;
    numero!: string;
    cadastroCompleto!: boolean;
    candidato!: Candidato;
    empregador!: Empregador;
    vagas!: Vagas;
}
