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
}