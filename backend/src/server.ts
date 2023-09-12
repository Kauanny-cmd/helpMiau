import fastify from 'fastify';
import { authRoutes } from './routes/auth';
import { postsRoutes } from './routes/posts';

const app = fastify({ logger: true });
// Definição de rotas
app.register(authRoutes);
app.register(postsRoutes);

// Inicialização do servidor
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on port http://localhost:3333')
  })
