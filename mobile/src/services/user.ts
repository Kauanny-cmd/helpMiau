import { api } from "./api";

const UserSign = {
  postUser: async (nome: string, login: string, senha: string) => {
    try {
      const response = await api.post('/register',{
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
  }
};

export default UserSign;