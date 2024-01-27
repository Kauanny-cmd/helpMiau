import { IPost, IPostCommentData, IComentario } from "../types/IPost";
import { api } from "./api";

const PostList = {
  getPost: async () => {
    try {
      const response = await api.get('/posts');
      // console.log("Resposta da solicitação:", response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  },
  getPostId: async (id: string) => {
    try {
      const response = await api.get(`/posts/${id}`);
      console.log("Resposta da solicitação:", response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  },
  getPostUser: async (id: string) => {
    try {
      const response = await api.get(`/post/usuario/${id}`);
      //console.log("Resposta da solicitação:", response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  },
  postData: async (postData: IPost) => {
    try {
      const response = await api.post('/createPost', postData);
      console.log("Resposta da solicitação:", response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  },
  postReport: async (id: string, postCommentData: IPostCommentData) => {
    try {
      const response = await api.post(`/commentPost/${id}`, postCommentData);
      console.log("Resposta da solicitação:", response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  },
  postUserComentarios: async (comentarios: Array<IComentario>) => {
    try {
      const response = await api.post('/usuarios/comentarios', comentarios)
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  },
  deletePost: async (postId: string, userId: string) => {
    try {
      const response = await api.delete(`/deletePost/${postId}`, {
        data: { postId, userId },
      });
      return response.data
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  }
};

export default PostList;