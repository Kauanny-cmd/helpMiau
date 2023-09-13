import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import {z} from 'zod'

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

  app.post('/createPost', async (request) => {
    const bodySchema = z.object({
      descricao: z.string(),
      imagens: z.string().array(),
      isPublic: z.coerce.boolean().default(false),
      localizacao: z.coerce.string().array(),
      filtros: z.string().array(),
      userId: z.string()
    })

    const postData = bodySchema.parse(request.body)
    const post = await prisma.post.create({
      data: {
        descricao: postData.descricao,
        imagens: postData.imagens,
        isPublic: postData.isPublic,
        localizacao: postData.localizacao,
        filtros: postData.filtros,
        userId: postData.userId,
      },
    })

    return post
  })
}