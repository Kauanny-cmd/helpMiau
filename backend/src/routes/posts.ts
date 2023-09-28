import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function postsRoutes(app: FastifyInstance) {
  app.get('/posts', async () => {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      include:{
        comentarios:{
          orderBy:{
            createdAt: 'asc'
          }
        }
      }
    })
    
    return (posts.map((post) => {
      return {
        id: post.id,
        nomePet: post.nomePet,
        imagens: post.imagens,
        filtros: post.filtros,
        localizacoes: post.localizacao,
        avisos: post.avisos,
        isPublic: post.isPublic,
        usuario: post.userId,
        excerpt: post.descricao.substring(0, 115).concat('...'),
        comentarios: post.comentarios.map((comment) => {
          return {
            id: comment.id,
            descricao: comment.descricao,
            userId: comment.userId,
          };
        }),
      }
    }))
  })

  app.post('/createPost', async (request) => {
    const bodySchema = z.object({
      nomePet: z.string(),
      descricao: z.string(),
      imagens: z.string().array(),
      isPublic: z.coerce.boolean().default(false),
      localizacao: z.coerce.string().array(),
      filtros: z.string().array(),
      userId: z.string()
    })

    const postData = bodySchema.parse(request.body)
    // Cria um novo post seguindo o esquema dado
    const post = await prisma.post.create({
      data: {
        nomePet: postData.nomePet,
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

  app.post('/commentPost/:id', async (request, reply) => {
    try {
      const bodySchema = z.object({
        descricao: z.string(),
        userId: z.string(),
        postId: z.string(),
      })

      const postCommentData = bodySchema.parse(request.body)

      // Verificando se o post existe
      const post = await prisma.post.findUnique({
        where: {
          id: postCommentData.postId,
        }
      })

      if (!post) {
        reply.code(404).send({ error: 'Post não existe!' })
        return
      }

      // Criando comentário
      const commentPost = await prisma.comentarioPost.create({
        data: {
          descricao: postCommentData.descricao,
          userId: postCommentData.userId,
          postId: postCommentData.postId
        }
      })

      reply.send({ message: 'Comentário adicionado com sucesso.', commentPost });
      return commentPost
    } catch (e) {
      console.log(e)
      reply.code(500).send({ error: 'Erro ao comentar na postagem.' });
    }
  })

  app.delete('/deletePost/:id', async (request, reply) => {
    try {
      const bodySchema = z.object({
        postId: z.string(),
        userId: z.string()
      })

      const postData = bodySchema.parse(request.body)

      // Verifica se o ID do usuário está presente na solicitação
      if (!postData.userId) {
        reply.code(401).send({ error: 'Usuário não autenticado.' });
        return;
      }
      // Busca as informações do post, incluindo o ID do usuário que criou o post
      const post = await prisma.post.findUnique({
        where: {
          id: postData.postId,
        },
        select: {
          userId: true,
        },
      });
      // Verifica se o post existe
      if (!post) {
        reply.code(404).send({ error: 'Post não encontrado.' });
        return;
      }
      // Verifica se o post pertence ao usuário que está tentando excluí-lo
      if (post.userId !== postData.userId) {
        reply.code(403).send({ error: 'Você não tem permissão para excluir este post.' });
        return;
      }
      // Exclui o post se tudo estiver correto
      await prisma.post.delete({
        where: {
          id: postData.postId,
        },
      });
      reply.send({ message: 'Post excluído com sucesso.' });
    } catch (e) {
      console.error(e);
      reply.code(500).send({ error: 'Erro ao excluir postagem.' });
    }
  })
}