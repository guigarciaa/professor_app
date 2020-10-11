import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../models/professor.model';
import { HTTPMethod, HttpRequests } from './http-requests.service';

@Injectable({ providedIn: 'root' })
export class ProfessorService {
    private readonly PATH_REQUEST: string = "assets/json/professores.json";
    constructor(private communicator: HttpRequests) { }

    getProfessores(): Promise<Professor[]> {
        return this.communicator.execute<Professor[]>(HTTPMethod.Get, this.PATH_REQUEST).toPromise();
    }

    async getProfessorPorMateria(materiaId: number): Promise<string[]> {
        let professores = await this.getProfessores();
        let retorno = [];
        professores.map(professor => {
            let findMateria = professor.materias.find(x=> x == materiaId);
            findMateria ? retorno.push(professor.nome) : "";
        })
        return retorno;
    }
}