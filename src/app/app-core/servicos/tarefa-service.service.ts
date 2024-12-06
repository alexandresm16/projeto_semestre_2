import {Injectable} from '@angular/core';
import {Tarefa} from "../model/Tarefa";
import Dexie from "dexie";

@Injectable({
  providedIn: 'root'
})
export class TarefaService extends Dexie {
  private tarefasTeste: Tarefa[] = [];


  private tarefas: string[] = [];

  tarefasDB: Dexie.Table<Tarefa, number>;

  constructor() {
    super('TarefaDB');
    this.version(1).stores({
      tarefas: '++id, titulo, dataInicio, dataConclusao, status, descricao',
    });

    this.tarefasDB = this.table('tarefas');

  }

  async adicionarTarefa(tarefa: Tarefa): Promise<number> {
    return await this.tarefasDB.add(tarefa);
  }

  async buscarTarefa(): Promise<Tarefa[]> {
    return await this.tarefasDB.toArray();
  }

  async removerTareta(id: number): Promise<void>{
    return await this.tarefasDB.delete(id);
  }

  async atualizarTarefa(id: number, tarefa: Tarefa): Promise<number> {
    return await this.tarefasDB.update(id, tarefa);
  }







}


