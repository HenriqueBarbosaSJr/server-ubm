import type { FastifyInstance } from 'fastify';
import controller from '../controllers/controller.js';
import type { CodproParams, ProdutoBody } from '../controllers/controller.js';
import controllerUsers from '../controllers/controllerUsers.js';
import authorization from '../middleware/authorization.js';

export async function transactionRoutes(server :FastifyInstance){
    server.get('/',controller.root);
    server.get('/prods',controller.searchPro);
    
    server.post<{ Body: ProdutoBody }>('/prods/include',{ preHandler: authorization.verifyToken },controller.includePro);
    server.put<{ Params: CodproParams; Body: ProdutoBody }>('/prods/update/:codpro',{ preHandler: authorization.verifyToken },controller.updatePro);
    server.delete<{ Params: CodproParams }>('/prods/delete/:codpro',{ preHandler: authorization.verifyToken },controller.deletePro);


    server.get('/searchUsersAll',controllerUsers.searchUsersAll);
    server.post('/createuser',controllerUsers.createUser);
    server.post('/userauth',controllerUsers.authUsers);

}