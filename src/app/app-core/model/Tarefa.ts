export class Tarefa {

  id?: number;
  titulo: string;
  datainicio: string;
  dataconclusao: string;
  status: string;
  descricao: string;
  imagem?: string;

  constructor(titulo: string, datainicio: string, dataconclusao: string, status: string, descricao: string, id?: number, imagem?: string) {
    this.titulo = titulo;
    this.datainicio = datainicio;
    this.dataconclusao = dataconclusao;
    this.status = status;
    this.descricao = descricao;
    this.id = id;
    this.imagem = imagem;
  }

}
