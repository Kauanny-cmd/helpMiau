import { IPost } from "src/types/IPost";
import { api } from "./api";

const PostList = {
  getPost: async () => {
    try {
      const response = await api.get('/posts');
      console.log("Resposta da solicitação:", response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  },
  postData: async(postData: IPost)=>{
    try {
      const response = await api.post('/createPost', postData);
      console.log("Resposta da solicitação:", response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  }
};

export default PostList;