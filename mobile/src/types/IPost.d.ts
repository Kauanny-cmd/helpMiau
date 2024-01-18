export interface IFilters {
    Tipo: string[];
    Porte: string[];
    Pelo: string[];
    Cor: string[];
    FaseVida: string[];
    Sexo: string[];
  }

export type IPost = {
    id:string,
    nomePet: string,
    excerpt: string,
    imagens: string[],
    isPublic: boolean,
    localizacao: string[],
    filtros:IFilters,
    usuario: string
}

export type IPostCommentData = {
    descricao: string,
    userId: string,
    postId: string,
}

export type IComentario = {
    id: string,
    userId: string;
    descricao: string;
};