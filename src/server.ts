import fastify from 'fastify';
import { transactionRoutes } from './routes/transactions.js';

const server = fastify();
server.register(transactionRoutes);

server.listen({
    port:3000
},()=>{console.log('servidor on - Porta 3000');
});