import { Component, OnInit } from '@angular/core';
import {TarefaService} from "../../app-core/servicos/tarefa-service.service";
import {Tarefa} from "../../app-core/model/Tarefa";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

declare var $: any;
import swal from "sweetalert2";

@Component({
  selector: 'app-visualizar-tarefas',
  templateUrl: './visualizar-tarefas.component.html',
  styleUrls: ['./visualizar-tarefas.component.css']
})
export class VisualizarTarefasComponent implements OnInit {

  i: number =0;

  tarefas: Tarefa [] = [];

  formularioTarefa: FormGroup;


  constructor(private tarefaService: TarefaService,
              private fb: FormBuilder) {


    this.formularioTarefa = this.fb.group({
      tituloTarefa: ['', Validators.required],
      dataInicioTarefa: ['', Validators.required],
      dataConclusaoTarefa: ['', Validators.required],
      statusTarefa: ['', Validators.required],
      descricaoTarefa: ['', Validators.required],
      id: [0],
      imagem: []
    });
  }

  onFileChange(event: any){
    const file = event.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        this.formularioTarefa.patchValue({imagem: loadEvent?.target?.result});
      };
      reader.readAsDataURL(file);
    }
  }

  ngOnInit(): void {
    this.listarTarefas();
  }

  listarTarefas(){
    this.tarefaService.buscarTarefa().then(resposta => this.tarefas = resposta);
  }


  openModal(){
    $('#add-tarefa').modal('show');
  }

  closeModal(){
    $('#add-tarefa').modal('hide');
  }

  salvarTarefa(){
    if(this.formularioTarefa.valid){
      const novaTarefa: Tarefa = new Tarefa(
        this.formularioTarefa.value.tituloTarefa,
        this.formularioTarefa.value.dataInicioTarefa,
        this.formularioTarefa.value.dataConclusaoTarefa,
        this.formularioTarefa.value.statusTarefa,
        this.formularioTarefa.value.descricaoTarefa,
        undefined,
        this.formularioTarefa.value.imagem);

      this.tarefaService.adicionarTarefa(novaTarefa)
        .then(resposta => {
        if(resposta > 0){
          swal.fire('Sucesso.', 'Tarefa Salva Com Sucesso!', 'success');
          this.formularioTarefa.reset();
          this.listarTarefas();
        }
      }).catch(error => {
        swal.fire('Não foi dessa vez.', 'Não foi possivel salvar a tarefa', 'error');
      })

    }else{
      console.log("CAMPOS INVALIDOS ENCONTRADOS");
      this.marcarTodosComoClicados();
      swal.fire('Cuidado', 'Alguns campos estão invalidos', 'warning');
    }


  }

  isCampovalido(inputNome: string ): boolean {
    const campo: any = this.formularioTarefa.get(inputNome);
    return campo && campo.touched && campo.invalid;
  }

  marcarTodosComoClicados(){
    this.formularioTarefa.markAllAsTouched();
  }

  submitform(){
    if(this.formularioTarefa.value.id > 0){
      //chamar o metodo de editar
    }else {
      this.salvarTarefa();
    }

  }

  excluirTarefa(id: number){
    swal.fire({
      title: 'Tem certeza que deseja excluir?',
      text: 'Você não poderá reverter essa decisão!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      confirmButtonColor: '#3085d6',
    }).then(value => {
      if(value.isConfirmed){
        this.tarefaService.removerTareta(id).then(resposta => {
          swal.fire('Sucesso', 'Tarefa excluida com sucesso!', 'success');
          this.listarTarefas();
        });

      }
    }).catch(error => {
      swal.fire('Erro', 'A tarefa não pode ser deletada', 'error');
    });

  }

  carregarDadosTarefa(tarefaEditar: Tarefa){
    this.formularioTarefa.patchValue({
      tituloTarefa: tarefaEditar.titulo,
      dataInicioTarefa: tarefaEditar.datainicio,
      dataConlusaoTarefa: tarefaEditar.dataconclusao,
      descricaoTarefa: tarefaEditar.descricao,
      id: tarefaEditar.id,
      imagem: tarefaEditar.imagem
    });
    this.openModal();
  }

  editarFormTarefa(){
    const editarTarefa: Tarefa = new Tarefa(
      this.formularioTarefa.value.tituloTarefa,
      this.formularioTarefa.value.dataInicioTarefa,
      this.formularioTarefa.value.dataConclusaoTarefa,
      this.formularioTarefa.value.statusTarefa,
      this.formularioTarefa.value.descricaoTarefa,
      this.formularioTarefa.value.id,
      this.formularioTarefa.value.imagem
    );
    this.tarefaService.atualizarTarefa(this.formularioTarefa.value.id, editarTarefa)
      .then(resposta => {
        if(resposta === 1){
          swal.fire('Sucesso!','Tarefa editada com sucesso.', 'success');
          this.formularioTarefa.reset();
          this.closeModal();
          this.listarTarefas();
        }else {
          swal.fire('Atenção', 'Nenhuma tarefa econtrada, ou nenhuma atualização necessária', 'info');
        }
      });

  }

  protected readonly Tarefa = Tarefa;
}
