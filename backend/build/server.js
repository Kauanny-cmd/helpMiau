"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const auth_1 = require("./routes/auth");
const posts_1 = require("./routes/posts");
const topic_1 = require("./routes/topic");
const app = (0, fastify_1.default)({ logger: true });
// Definição de rotas
app.register(auth_1.authRoutes);
app.register(posts_1.postsRoutes);
app.register(topic_1.topicsRoutes);
// Inicialização do servidor
app
    .listen({
    port: 3333,
    host: '0.0.0.0',
})
    .then(() => {
    console.log('🚀 HTTP server running on port http://localhost:3333');
});
