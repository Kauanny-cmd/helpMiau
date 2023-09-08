import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'

export async function authRoutes(app: FastifyInstance){
  app.post('/register', async (req, reply) => {
    const { nome, login } = req.body as { nome: string, login: string };

    // Validação com zod
    const userSchema = z.object({
      nome: z.string(),
      login: z.string(),
    })

    try{
      const userData = userSchema.parse({nome, login})
      const user = await prisma.usuario.create({
        data:{
          nome: userData.nome,
          login: userData.login,
          avatarUrl: "",
          telefone: "",
          pets: [],
        }
      })
      return user;
    }catch(e){
      reply.status(400).send({ error: 'Invalid data' });
    }
  })
}