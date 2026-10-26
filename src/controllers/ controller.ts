import type { FastifyReply, FastifyRequest } from 'fastify';
import db from '../databases/db.js';

type ProdutoBody = {
  nome: string;
  descri: string;
  fabricante: string;
  qtda: number;
  preco: number;
  custo: number;
};

type CodproParams = {
  codpro: string;
};

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
    },
     async searchPro(req:FastifyRequest, res:FastifyReply){
         try {
            const result = await db('produtos');
            return res.send(result);
            
        } catch (error) {
             return res.status(500).send({ erro: 'Erro interno ao consultar produtos' });
        }
    },
     async includePro(req:FastifyRequest<{ Body: ProdutoBody }>, res:FastifyReply){
            try {
                const { nome } = req.body;
                const { descri } = req.body;
                const { fabricante } = req.body;
                const { qtda } = req.body;
                const { preco } = req.body;
                const { custo } = req.body;
                await db('produtos').insert({
                    nome,
                    descri,
                    fabricante,
                    qtda,
                    preco,
                    custo
                });
            return res.status(201).send();
                
            } catch (error) {
                return res.status(500).send({ erro: 'Erro interno ao cadastrar produtos' });
            }
        },
         async updatePro(req:FastifyRequest<{ Params: CodproParams; Body: ProdutoBody }>,
                         res:FastifyReply){
            try {     
                const { codpro } = req.params;
                const { nome } = req.body;
                const { descri } = req.body;
                const { fabricante } = req.body;
                const { qtda } = req.body;
                const { preco } = req.body;
                const { custo } = req.body;                
                const updatedCount = await db('produtos').where({ codpro }).update({
                    nome,
                    descri,
                    fabricante,
                    qtda,
                    preco,
                    custo
                });
                if (updatedCount === 0) {
                    return res.status(404).send({ erro: 'Produto não encontrado' });
                }
                return res.status(204).send();
            } catch (error) {
                return res.status(500).send({ erro: 'Erro interno ao alterar produto' });
            }
        },
        async deletePro(req:FastifyRequest<{ Params: CodproParams }>, res:FastifyReply){
            try {
                const { codpro } = req.params;
                console.log(codpro);
                
                const deletedCount = await db('produtos')
                        .where({ codpro })
                        .del();
                if (deletedCount === 0) {
                    return res.status(404).send({ erro: 'Produto não encontrado' });
                }
                return res.status(204).send();
            } catch (error) {
                return res.status(500).send({ erro: 'Erro interno ao deletar produto' });
            }
        }

}


export default controller;