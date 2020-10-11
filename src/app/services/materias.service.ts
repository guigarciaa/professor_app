import { Injectable } from '@angular/core';
import { Materia } from '../models/materia.model';
import { HTTPMethod, HttpRequests } from './http-requests.service';

@Injectable({ providedIn: 'root' })
export class MateriaService {
    private readonly PATH_REQUEST: string = "assets/json/materias.json";
    constructor(private communicator: HttpRequests) { }

    getMaterias(): Promise<Materia[]> {
        return this.communicator.execute<Materia[]>(HTTPMethod.Get, this.PATH_REQUEST).toPromise();
    }

    async getMateriasPorIds(ids: number[]) : Promise<string[]> {
        let materias = await this.getMaterias();
        let retorno = [];
        if(ids){
            ids.map(id=> {
                retorno.push(materias.find(x=> x.id == id).nome);
            });
        }        
        return retorno;
    }
}