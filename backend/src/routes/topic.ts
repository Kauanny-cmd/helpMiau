import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import {z} from 'zod'

export async function topicsRoutes(app: FastifyInstance) {
  app.get('/topics', async () => {
    const topics = await prisma.topico.findMany({
      orderBy:{
        createdAt: 'asc'
      }
    })
    return (topics.map((topic) => {
      return {
        id: topic.id,
        comentarios: topic.comentarios,
        isPublic: topic.isPublic,
        usuario: topic.userId,
        excerpt: topic.descricao.substring(0, 115).concat('...'), 
      }
    }))
  })

  app.post('/createTopic', async (request) => {
    const bodySchema = z.object({
      titulo: z.string(),
      descricao: z.string(),
      userId: z.string()
    })

    const topicData = bodySchema.parse(request.body)
    // Cria um novo tópico seguindo o esquema dado
    const topico = await prisma.topico.create({
      data: {
        titulo: topicData.titulo,
        descricao: topicData.descricao,
        userId: topicData.userId,
      },
    })

    return topico
  })

  app.delete('/deleteTopic/:id', async (request, reply) => {
    try {
      const bodySchema = z.object({
        topicId: z.string(),
        userId: z.string()
      })
  
      const topicData = bodySchema.parse(request.body)

      // Verifica se o ID do usuário está presente na solicitação
      if (!topicData.userId) {
        reply.code(401).send({ error: 'Usuário não autenticado.' });
        return;
      }
      // Busca as informações do tópico, incluindo o ID do usuário que criou o tópico
      const topico = await prisma.topico.findUnique({
        where: {
          id: topicData.topicId,
        },
        select: {
          userId: true,
        },
      });
      // Verifica se o tópico existe
      if (!topico) {
        reply.code(404).send({ error: 'Tópico não encontrado.' });
        return;
      }
      // Verifica se o tópico pertence ao usuário que está tentando excluí-lo
      if (topico.userId !== topicData.userId) {
        reply.code(403).send({ error: 'Você não tem permissão para excluir este tópico.' });
        return;
      }
      // Exclui o tópico se tudo estiver correto
      await prisma.topico.delete({
        where: {
          id: topicData.topicId,
        },
      });
      reply.send({ message: 'Tópico excluído com sucesso.' });
    } catch (e) {
      console.error(e);
      reply.code(500).send({ error: 'Erro ao excluir o tópico de conversa.' });
    }
  })
}