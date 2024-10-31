import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/servicos/tarefa-service.service";

@Component({
  selector: 'app-visualizar-tarefas',
  templateUrl: './visualizar-tarefas.component.html',
  styleUrls: ['./visualizar-tarefas.component.css']
})
export class VisualizarTarefasComponent implements OnInit {

  constructor(private tarefaService: TarefaService) { }

  ngOnInit(): void {
  }

}
