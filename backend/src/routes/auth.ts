import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import * as jwt from 'jsonwebtoken';

export async function authRoutes(app: FastifyInstance) {

  app.post('/register', async (req, reply) => {
    const bodySchema = z.object({
      nome: z.string(),
      login: z.string().email(),
      senha: z.string(),
    });

    try {
      const { nome, login, senha } = bodySchema.parse(req.body);

      // Verificar se o usuário já existe no banco de dados
      const existingUser = await prisma.usuario.findUnique({
        where: {
          login,
        }
      });

      if (existingUser) {
        return reply.status(400).send({ error: 'Usuário já registrado com este e-mail' });
      }

      // Criar usuário no banco de dados
      const user = await prisma.usuario.create({
        data: {
          nome,
          login,
          telefone: "",
          avatarUrl: "",
        }
      });

      const token = jwt.sign({ userId: user.id, userEmail: user.login }, 'secreto', {
        expiresIn: '7d',
      });

      return reply.send({ message: 'Conta criada com sucesso', user, token });
    } catch (e) {
      console.error('Erro:', e);
      return reply.status(400).send({ error: 'Erro durante o registro' });
    }
  });

  app.put('/usuario/:id', async (req, reply) => {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramsSchema.parse(req.params)

      const usuarioSchema = z.object({
        nome: z.string(),
        login: z.string(),
        avatarUrl: z.string(),
        telefone: z.string(),
        pets: z.array(z.string()),
      });

      const usuarioData = usuarioSchema.parse(req.body);

      const updatedUsuario = await prisma.usuario.update({
        where: { id },
        data: usuarioData,
      });

      reply.code(200).send(updatedUsuario);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Erro ao atualizar usuário.' });
    }
  });
}