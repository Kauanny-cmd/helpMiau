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
}