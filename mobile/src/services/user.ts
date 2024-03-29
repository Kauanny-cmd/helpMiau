import { IUser } from "../types/IUser";
import { api } from "./api";

const UserSign = {
  getUser:async (email:string) =>{
    try{
      const response = await api.get(`/usuario/${email}`);
      console.log("Resposta da solicitação: ", response.data);
      return response.data;
    } catch(error){
      console.error('Erro na solicitação:', error);
      throw error;
    }
  },
  postUser: async (nome: string, login: string, senha: string) => {
    try {
      const response = await api.post('/register', {
        nome,
        login,
        senha
      });
      console.log("Resposta da solicitação:", response.data);
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  },
  updateUser: async (userId: string, userData: IUser) => {
    try {
      const response = await api.put(`/usuario/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Erro na solicitação:', error);
      throw error;
    }
  }
};

export default UserSign;