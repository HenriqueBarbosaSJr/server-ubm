import type { FastifyReply, FastifyRequest } from 'fastify';
import db from '../databases/db.js';
import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken'


type UserBody = {
  nome: string;
  email: string;
  senha: string;
  level: number;
};

type IdUser = {
  id: string;
};

const controllerUsers = {
     async createUser(req:FastifyRequest<{ Body: UserBody }>, res:FastifyReply){
        try {
            const { nome, email, level } = req.body;
            const senha = await bcrypt.hash(req.body.senha, 10);
            console.log(senha);
            await db('usuarios').insert({
                nome,
                email,
                senha,
                level
            });
            return res.status(201).send();

        } catch (error) {
            console.error(error);
            return res.status(500).send({ erro: 'Erro interno ao cadastrar usuários' });
        }
    },
     async searchUsersAll(req:FastifyRequest<{ Body: UserBody }>, res:FastifyReply){

        const results = await db('usuarios');
        
        return res.send(results);
    },
      async authUsers(req:FastifyRequest<{ Body: UserBody }>, res:FastifyReply){
        try {
            const { email } = req.body;
            const   [ result ]  = await db ('usuarios').where( { email } );
            console.log(result);
            if (result != undefined){
                let respok: boolean;
                try {
                    respok = await bcrypt.compare(req.body.senha, result.senha);
                } catch {
                    return res.status(401).send({mensagem: 'Falha na autenticação - error interno bcrypt'});
                }
                if (respok){
                    const token = jwt.sign({
                        idUser:result.id,
                        nome:result.nome,
                        email:result.email,
                        level:result.level
                    },'segredo',
                    {
                        expiresIn:'1h'
                    }
                    );
                    return res.status(200).send({
                        token:token,
                        mensagem: 'Autenticação com sucesso'});
                }
                return res.status(401).send({mensagem: 'Falha na autenticação - error password'});
            }else{
                console.log({result});
                return res.status(401).send({mensagem: 'Falha na autenticação - email'});
            }
        } catch (error) {
          console.log(error);
        }
    }

}


export default controllerUsers;