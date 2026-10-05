import type { FastifyReply, FastifyRequest } from 'fastify';


const controller = {
    async root(req:FastifyRequest, res:FastifyReply):Promise <FastifyReply>{
        return res.type('text/html').send(
            `
                <!DOCTYPE html>
                <html lang="pt-BR">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Documentação UBM</title>
                    </head>
                    <body>
                        <h1>Documentação da API</h1>
                        <p>Bem-vindo à documentação da nossa API! Esta interface foi projetada para facilitar a integração e o gerenciamento de dados essenciais do sistema, como clientes, produtos, fornecedores e compras.</p>
                        <p>Seguindo os princípios REST, a API utiliza os métodos HTTP padrão (GET, POST, PUT, DELETE) e se comunica através do formato JSON.</p>
                        <p>Neste documento, você encontrará a estrutura do banco de dados e a lista de endpoints disponíveis.</p>
                    </body>
                </html>

            `
        );
    }
}


export default controller;