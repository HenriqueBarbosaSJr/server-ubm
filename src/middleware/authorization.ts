import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import type { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';

type AuthorizationRequest = FastifyRequest & {
    session?: string | JwtPayload;
};

export default {
    verifyToken: (req: AuthorizationRequest, res: FastifyReply, next: HookHandlerDoneFunction)=>{
        try {
            console.log('Executando a autorização....');
            const authHeader =req.headers.authorization;
            
            if(!authHeader){
            return void res.status(401).send({error:'Requisição sem token'}); 
            }
            const partsToken = authHeader.split(' ');
            const [ scheme, token ] = partsToken;
            if (partsToken.length != 2 || scheme === undefined || token === undefined){
                return void res.status(401).send({error:'Token inválido'}); 
            }

            /* Busca através de expressões regulares
                
                /^Bearer$/i.test(scheme)

                / início e fim do elemento de busca
                ˆ início da verificação
                $ indica o final da verificação
                i insensitive (não case-sensitive)
                test método que executa a procura

                ! negação da estrutura condicional if 
            */

            if (!/^Bearer$/i.test(scheme)){
                return void res.status(401).send({error:'Token fora do padrão esperado'}); 
            }
            const decode = jwt.verify(token, 'segredo');
            console.log(decode);
            req.session = decode;
            next();
        } catch (error) {
            return void res.status(401).send({error:'Falha na autenticação - error de token'}); 
        }

    }
}