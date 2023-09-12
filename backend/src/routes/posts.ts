import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

export async function postsRoutes(app: FastifyInstance) {
  app.get('/posts', async (req, res) => {
    const posts = await prisma.post.findMany({
      orderBy:{
        createdAt: 'asc'
      }
    })
    return (posts.map((post) => {
      return {
        id: post.id,
        imagens: post.imagens,
        filtros: post.filtros,
        localizacoes: post.localizacao,
        avisos: post.avisos,
        isPublic: post.isPublic,
        usuario: post.userId,
        excerpt: post.descricao.substring(0, 115).concat('...'), 
      }
    }))
  })
}