# Help Miau
![Help Miau](mobile/assets/helpMiau.png)
## Descrição

A plataforma HelpMiAu, um projeto desenvolvido como fruto do meu Trabalho de Conclusão de Curso (TCC), e tem como objetivo a propagação de anúncios ou informações de animais domésticos desaparecidos baseados em feedbacks de suas últimas localizações.

## Pré-requisitos

Para que o projeto rode na sua máquina, são necessários:
- Instalação do NPM e TypeScript global;
- Um banco no Supabase previamente criado;
- Arquivo .env no Backend e Mobile com as configurações;
- Expo instalado.

## Instalação

1. Clone o repositório do projeto:

    ```bash
    git clone https://github.com/Kauanny-cmd/helpMiau
    ```

2. Instale as dependências do projeto:

- Backend
    ```bash
    cd backend
    npm run dev
    ```
- Mobile
     ```bash
    cd mobile
    npm install
    ```

3. Configure as variáveis de ambiente necessárias:

    - Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias. Você pode usar um arquivo `.env.example` como modelo;
    - Todas as informações ficam disponíveis na configuração do banco (Settings -> Database);
    - Demais informações podem ser encontradas na [documentação do Supabase](https://supabase.com/docs).

4. Execute o projeto:

- Backend
    ```bash
    cd helpMiau
    cd backend
    npx prisma generate
    npm install
    ```
- Mobile
     ```bash
    cd helpMiau
    cd mobile
    npx expo start
    ```
