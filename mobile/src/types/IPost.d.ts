export type IPost = {
    nomePet: string,
    descricao: string,
    imagens: string[],
    isPublic: boolean,
    localizacao: string[],
    filtros: string[],
    userId: string
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