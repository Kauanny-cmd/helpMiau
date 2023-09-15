import fastify from 'fastify';
import { authRoutes } from './routes/auth';
import { postsRoutes } from './routes/posts';
import { topicsRoutes } from './routes/topic';

const app = fastify({ logger: true });
// Definição de rotas
app.register(authRoutes);
app.register(postsRoutes);
app.register(topicsRoutes);

// Inicialização do servidor
app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running on port http://localhost:3333')
  })
