import type { FastifyInstance } from 'fastify';
import controller from '../controllers/ controller.js';

export async function transactionRoutes(server :FastifyInstance){
    server.get('/',controller.root);
}