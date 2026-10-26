import type { FastifyInstance } from 'fastify';
import controller from '../controllers/ controller.js';

export async function transactionRoutes(server :FastifyInstance){
    server.get('/',controller.root);
    server.get('/prods',controller.searchPro);
    server.post('/prods/include',controller.includePro);
    server.put('/prods/update/:codpro',controller.updatePro);
    server.delete('/prods/delete/:codpro',controller.deletePro);
}