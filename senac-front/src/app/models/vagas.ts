import { Candidato } from "./candidato";
import { Empregador } from "./empregador";

export class Vagas {
    id!: number;
    titulo!: string;
    descricao!: string;
    salario!: string;
    requisito!: string;
    setor!: string;
    tipo!: string;
    dataAnuncio!: string;
    status!: boolean;
    nivelExperiencia!: string;
    empregador!: Empregador;
    candidatos!:Candidato[];
}
