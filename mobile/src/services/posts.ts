import { api } from "./api";

const PostList = {
  getPost: async () => {
    try {
      const response = await api.get('/Post');
      console.log("Resposta da solicitação:", response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  }
};

export default PostList;