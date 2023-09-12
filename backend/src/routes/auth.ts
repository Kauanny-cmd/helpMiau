import { FastifyInstance } from 'fastify';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '../lib/prisma';
import { z } from 'zod';
import axios from 'axios';

export async function authRoutes(app: FastifyInstance) {
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET; // Substitua pelo seu segredo do cliente Google
  const redirectUri = process.env.REDIRECT_URI;
  /*const RESPONSE_TYPE = 'code';
  const SCOPE = encodeURI('openid email');*/
  const SUPABASE_URL = 'https://vxqklgduvcftxkloprpd.supabase.co';
  const SUPABASE_KEY = process.env.SUPABASE_KEY as string;
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY,{
    auth:{
      persistSession: false,
    }
  });
  
  app.post('/register', async (req, reply) => {
    const bodySchema = z.object({
      code: z.string(),
    });
    const { code } = bodySchema.parse(req.body);

    try {
      const tokenResponse = await axios.post(
        'https://oauth2.googleapis.com/token',
        {
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: redirectUri,
          grant_type: 'authorization_code',
        }
      );

      // Verifique se a resposta contém tokens
      const { access_token, id_token } = tokenResponse.data;

      //Autenticar no Supabase
      const supabaseResponse = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: id_token,
        access_token,
      });

      // Validação com zod
      const userSchema = z.object({
        id: z.string(),
        nome: z.string(),
        login: z.string(),
        fotoUrl: z.string(),
      });

      const userData = userSchema.parse(supabaseResponse.data);

      let user = await prisma.usuario.findUnique({
        where: {
          id: userData.id,
        },
      });

      if (!user) {
        user = await prisma.usuario.create({
          data: {
            nome: userData.nome,
            login: userData.login,
            avatarUrl: userData.fotoUrl,
            telefone: "",
            pets: [],
          },
        });
      }

      //console.log('UserData' + userData);
      return reply.send({ message: 'Usuário registrado com sucesso', user });
    } catch (e) {
      return reply.status(400).send({ error: 'Erro durante o registro' });
    }
  });

  app.put('/usuario/:id', async (req, reply) => {
    try {
      const paramsSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = paramsSchema.parse(req.params)

      const usuarioSchema = z.object({
        nome: z.string(),
        login: z.string(),
        avatarUrl: z.string(),
        telefone: z.string(),
        pets: z.array(z.string()),
      });

      const usuarioData = usuarioSchema.parse(req.body);

      const updatedUsuario = await prisma.usuario.update({
        where: { id },
        data: usuarioData,
      });

      reply.code(200).send(updatedUsuario);
    } catch (error) {
      console.error(error);
      reply.code(500).send({ error: 'Erro ao atualizar usuário.' });
    }
  });
}