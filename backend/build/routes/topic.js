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
exports.topicsRoutes = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
function topicsRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.get('/topics', () => __awaiter(this, void 0, void 0, function* () {
            const topics = yield prisma_1.prisma.topico.findMany({
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
            return (topics.map((topic) => {
                return {
                    id: topic.id,
                    isPublic: topic.isPublic,
                    usuario: topic.userId,
                    excerpt: topic.descricao.substring(0, 115).concat('...'),
                    comentarios: topic.comentarios.map((comment) => {
                        return {
                            id: comment.id,
                            descricao: comment.descricao,
                            userId: comment.userId,
                        };
                    }),
                };
            }));
        }));
        app.post('/createTopic', (request) => __awaiter(this, void 0, void 0, function* () {
            const bodySchema = zod_1.z.object({
                titulo: zod_1.z.string(),
                descricao: zod_1.z.string(),
                userId: zod_1.z.string()
            });
            const topicData = bodySchema.parse(request.body);
            // Cria um novo tópico seguindo o esquema dado
            const topico = yield prisma_1.prisma.topico.create({
                data: {
                    titulo: topicData.titulo,
                    descricao: topicData.descricao,
                    userId: topicData.userId,
                },
            });
            return topico;
        }));
        app.delete('/deleteTopic/:id', (request, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const bodySchema = zod_1.z.object({
                    topicId: zod_1.z.string(),
                    userId: zod_1.z.string()
                });
                const topicData = bodySchema.parse(request.body);
                // Verifica se o ID do usuário está presente na solicitação
                if (!topicData.userId) {
                    reply.code(401).send({ error: 'Usuário não autenticado.' });
                    return;
                }
                // Busca as informações do tópico, incluindo o ID do usuário que criou o tópico
                const topico = yield prisma_1.prisma.topico.findUnique({
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
                yield prisma_1.prisma.topico.delete({
                    where: {
                        id: topicData.topicId,
                    },
                });
                reply.send({ message: 'Tópico excluído com sucesso.' });
            }
            catch (e) {
                console.error(e);
                reply.code(500).send({ error: 'Erro ao excluir o tópico de conversa.' });
            }
        }));
    });
}
exports.topicsRoutes = topicsRoutes;
