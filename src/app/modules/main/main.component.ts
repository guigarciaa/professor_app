import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Materia } from 'src/app/models/materia.model';
import { Professor } from 'src/app/models/professor.model';
import { MateriaService } from 'src/app/services/materias.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'raw-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public professores: Professor[] = [];
  materias: Materia[] = [];
  inicial: boolean = true;
  titulo: string = "Clique em um professor para verificar as matérias lecionadas.";
  listaResposta: string[] = [];

  constructor(
    private _professorService: ProfessorService,
    private _materiaService: MateriaService
  ) { }

  ngOnInit(): void {
    this._professorService.getProfessores().then(x => this.professores = x);
    this._materiaService.getMaterias().then(x => this.materias = x);
  }

  clickProfessor(professor: Professor) {
    this.inicial = false;
    this.titulo = "Matérias Lecionadas";
    this._materiaService.getMateriasPorIds(professor.materias).then(x => this.listaResposta = x);
  }

  clickMateria(materia: Materia) {
    this.inicial = false;
    this.titulo = "Professores Aptos";
    this._professorService.getProfessorPorMateria(materia.id).then(x => {
      this.listaResposta = [];
      if(x.length) {
        this.listaResposta = x;
      } else {
        this.listaResposta.push("Nenhum professor apto para lecionar a matéria.");
      }
    });
  }

  clear(event: MatTabChangeEvent) {
    this.listaResposta = [];
    this.inicial = true;
    if(event.index == 0) {
      this.titulo = "Clique em um professor para verificar as matérias lecionadas.";
    } else {
      this.titulo = "Clique em uma máteria para verificar professores aptos.";
    }
    console.log(event)
  }
}