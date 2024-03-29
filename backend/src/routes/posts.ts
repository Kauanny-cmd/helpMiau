import { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function postsRoutes(app: FastifyInstance) {
  const postSchema = {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
    },
  } as RouteShorthandOptions;

  app.get('/posts', async () => {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      include: {
        comentarios: {
          orderBy: {
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

  app.get('/posts/:id', postSchema, async (request, response) => {
    try {
      const postData = request.params.id
      const post = await prisma.post.findUnique({
        where: {
          id: postData,
        },
        include: {
          comentarios: {
            orderBy: {
              createdAt: 'asc'
            }
          }
        }
      });

      if (!post) {
        return response.status(404).send({ error: 'Post não encontrado' });
      }

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

    } catch (error) {
      console.error('Erro na rota /posts/:postId:', error);
      response.status(500).send({ error: `Erro no servidor` });
    }
  });

  app.get('/post/usuario/:id', async (req, reply) => {
    try {
      const paramsSchema = z.object({
        id: z.string(),
      });
      
      const { id } = paramsSchema.parse(req.params);
  
      const usuario = await prisma.usuario.findUnique({
        where: {
          id: id,
        },
      });
  
      if (usuario) {
        reply.code(200).send({
          nome:usuario.nome,
          avatarUrl:usuario.avatarUrl
        });
      } else {
        reply.code(404).send({ error: 'Usuário não encontrado' });
      }
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Erro ao obter informações do usuário.' });
    }
  });
  
  app.post('/createPost', async (request) => {
    const bodySchema = z.object({
      nomePet: z.string(),
      descricao: z.string(),
      imagens: z.string().array(),
      isPublic: z.coerce.boolean().default(false),
      localizacao: z.coerce.string().array(),
      filtros: z.object({
        Cor: z.string().array(),
        FaseVida: z.string().array(),
        Porte: z.string().array(),
        Sexo: z.string().array(),
        Tipo: z.string().array(),
        Pelo: z.string().array(),
      }),
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

  app.post('/usuarios/comentarios', async (req, reply) => {
    try {
      const { comentarios } = req.body;
  
      // Extrair os IDs dos usuários dos comentários
      const userIds = comentarios.map(comentario => comentario.userId);
  
      // Consultar o banco de dados para obter os detalhes de cada usuário
      const usuarios = await prisma.usuario.findMany({
        where: {
          id: {
            in: userIds,
          },
        },
      });
  
      // Construir um objeto com o nome e avatar de cada usuário
      const usuariosData = usuarios.map(usuario => ({
        id: usuario.id,
        nome: usuario.nome,
      }));
  
      // Retornar o objeto com os detalhes dos usuários
      reply.code(200).send({ usuarios: usuariosData });
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Erro ao obter informações dos usuários dos comentários.' });
    }
  });

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
      // Exclui os comentários vinculados ao post
      await prisma.comentarioPost.deleteMany({
        where: {
          postId: postData.postId,
        },
      });
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