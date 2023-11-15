export type IPost = {
  data: {
    id: string;
    nomePet: string;
    imagens: string[];
    filtros: never[];
    localizacoes: never[];
    avisos: never[];
    isPublic: boolean;
    usuario: string;
    descricao: string;
    comentarios: never[];
  }
}