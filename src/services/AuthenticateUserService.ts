// Serviço que verifica a autenticação de um usuário

import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import authConfig from '../config/auth';
import User from '../models/User';

interface Request {
    email: string;

    password: string;
}

interface Response {
    user: User;

    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Incorrect Email/Password', 401);
        }

        // Compara se a senha informada pelo usuário coincide com a senha salva durante o cadastro
        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect Email/Password', 401);
        }

        // Prepara o Token
        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        // Retorna o Token de autenticação
        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
