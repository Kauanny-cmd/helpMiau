"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.authRoutes = void 0;
const prisma_1 = require("../lib/prisma");
const zod_1 = require("zod");
const jwt = __importStar(require("jsonwebtoken"));
function authRoutes(app) {
    return __awaiter(this, void 0, void 0, function* () {
        app.post('/register', (req, reply) => __awaiter(this, void 0, void 0, function* () {
            const bodySchema = zod_1.z.object({
                nome: zod_1.z.string(),
                login: zod_1.z.string().email(),
                senha: zod_1.z.string(),
            });
            try {
                const { nome, login, senha } = bodySchema.parse(req.body);
                // Verificar se o usuário já existe no banco de dados
                const existingUser = yield prisma_1.prisma.usuario.findUnique({
                    where: {
                        login,
                    }
                });
                if (existingUser) {
                    return reply.status(400).send({ error: 'Usuário já registrado com este e-mail' });
                }
                // Criar usuário no banco de dados
                const user = yield prisma_1.prisma.usuario.create({
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
            }
            catch (e) {
                console.error('Erro:', e);
                return reply.status(400).send({ error: 'Erro durante o registro' });
            }
        }));
        app.put('/usuario/:id', (req, reply) => __awaiter(this, void 0, void 0, function* () {
            try {
                const paramsSchema = zod_1.z.object({
                    id: zod_1.z.string().uuid(),
                });
                const { id } = paramsSchema.parse(req.params);
                const usuarioSchema = zod_1.z.object({
                    nome: zod_1.z.string(),
                    login: zod_1.z.string(),
                    avatarUrl: zod_1.z.string(),
                    telefone: zod_1.z.string(),
                    pets: zod_1.z.array(zod_1.z.string()),
                });
                const usuarioData = usuarioSchema.parse(req.body);
                const updatedUsuario = yield prisma_1.prisma.usuario.update({
                    where: { id },
                    data: usuarioData,
                });
                reply.code(200).send(updatedUsuario);
            }
            catch (error) {
                console.error(error);
                reply.code(500).send({ error: 'Erro ao atualizar usuário.' });
            }
        }));
    });
}
exports.authRoutes = authRoutes;
