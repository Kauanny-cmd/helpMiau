"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRoutes = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
function postsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/posts', () => __awaiter(this, void 0, void 0, function* () {
            const posts = yield prisma_1.prisma.post.findMany({
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
            });
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
                };
            }));
        }));
        app.post('/createPost', (request) => __awaiter(this, void 0, void 0, function* () {
            const bodySchema = zod_1.z.object({
                nomePet: zod_1.z.string(),
                descricao: zod_1.z.string(),
                imagens: zod_1.z.string().array(),
                isPublic: zod_1.z.coerce.boolean().default(false),
                localizacao: zod_1.z.coerce.string().array(),
                filtros: zod_1.z.string().array(),
                userId: zod_1.z.string()
            });
            const postData = bodySchema.parse(request.body);
            // Cria um novo post seguindo o esquema dado
            const post = yield prisma_1.prisma.post.create({
                data: {
                    nomePet: postData.nomePet,
                    descricao: postData.descricao,
                    imagens: postData.imagens,
                    isPublic: postData.isPublic,
                    localizacao: postData.localizacao,
                    filtros: postData.filtros,
                    userId: postData.userId,
                },
            });
            return post;
        }));
        app.post('/commentPost/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bodySchema = zod_1.z.object({
                    descricao: zod_1.z.string(),
                    userId: zod_1.z.string(),
                    postId: zod_1.z.string(),
                });
                const postCommentData = bodySchema.parse(request.body);
                // Verificando se o post existe
                const post = yield prisma_1.prisma.post.findUnique({
                    where: {
                        id: postCommentData.postId,
                    }
                });
                if (!post) {
                    reply.code(404).send({ error: 'Post não existe!' });
                    return;
                }
                // Criando comentário
                const commentPost = yield prisma_1.prisma.comentarioPost.create({
                    data: {
                        descricao: postCommentData.descricao,
                        userId: postCommentData.userId,
                        postId: postCommentData.postId
                    }
                });
                reply.send({ message: 'Comentário adicionado com sucesso.', commentPost });
                return commentPost;
            }
            catch (e) {
                console.log(e);
                reply.code(500).send({ error: 'Erro ao comentar na postagem.' });
            }
        }));
        app.delete('/deletePost/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bodySchema = zod_1.z.object({
                    postId: zod_1.z.string(),
                    userId: zod_1.z.string()
                });
                const postData = bodySchema.parse(request.body);
                // Verifica se o ID do usuário está presente na solicitação
                if (!postData.userId) {
                    reply.code(401).send({ error: 'Usuário não autenticado.' });
                    return;
                }
                // Busca as informações do post, incluindo o ID do usuário que criou o post
                const post = yield prisma_1.prisma.post.findUnique({
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
                yield prisma_1.prisma.post.delete({
                    where: {
                        id: postData.postId,
                    },
                });
                reply.send({ message: 'Post excluído com sucesso.' });
            }
            catch (e) {
                console.error(e);
                reply.code(500).send({ error: 'Erro ao excluir postagem.' });
            }
        }));
    });
}
exports.postsRoutes = postsRoutes;
